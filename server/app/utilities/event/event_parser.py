from langchain.llms import OpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)
from datetime import datetime
import os
from dotenv import load_dotenv
from app.models.events import Event
from app.models.profile import Profile
import json

load_dotenv()

homer_json = {
 "happiness": "Homer Simpson is a character that embodies a unique mix of joy and frustration. He's often happy when he's with his family, enjoying his favorite activities like eating donuts, drinking beer, or watching TV. However, he also faces daily challenges and setbacks, which occasionally lead to comical expressions of anger or exasperation. Overall, his happiness is derived from his love for his family and his ability to find simple pleasures in life.",
 "career": "Homer works at the Springfield Nuclear Power Plant as a safety inspector, a job that he has held for many years. Despite his incompetence and lack of interest in the job, he manages to avoid serious consequences and maintain his position. His career is marked by a series of odd jobs and unsuccessful ventures, but he always returns to his position at the power plant.",
 "finance": "Homer's financial situation is often portrayed as precarious, with the family living paycheck to paycheck. Despite this, they manage to maintain a comfortable lifestyle and rarely experience significant financial hardship. His impulsive spending habits and poor decision-making sometimes lead to financial troubles, but they are usually resolved in humorous ways.",
 "relationships": "Homer has a loving and supportive, yet sometimes strained, relationship with his wife Marge. They have three children: Bart, Lisa, and Maggie. He has a close bond with his kids, especially with Bart, despite their frequent disagreements. Homer also has several friends, including his drinking buddies from Moe's Tavern, and an ongoing rivalry with his neighbor, Ned Flanders.",
 "health": "Homer's health is often a subject of humor on the show. He's overweight, largely due to his love for food and a sedentary lifestyle. He frequently indulges in unhealthy behaviors such as excessive drinking and poor diet choices. Despite these habits, he has managed to survive various accidents and health scares, often with an element of slapstick comedy."
}

class EventModel:
    def __init__(self, temperature=0.4, model_name="text-davinci-003"):
        """Initialize the Event class."""
        self.temperature = temperature
        self.model_name = model_name
        self.openai_api_key = os.getenv("OPENAI_API_KEY")

    def process_event(self, user_message):
        llm = OpenAI(model_name=self.model_name, temperature=self.temperature, openai_api_key=self.openai_api_key)
        message = f"""
         Your goal is to go through my daily log and check if there is some information regarding my happiness, career, finance, relationships or health. You will include only events which are affecting directly only me.

         For every event you will encounter, you summarize this event in short sentence and tell me if it's positive or negative sentiment.

         You response will be array of json objects with field dimension, event, sentiment. No explanation. If there is no event, just return empty json. No other string is needed.

         Daily log: {user_message}
         """

        for dimension, summary in homer_json.items():
            response = Profile.get_dimension(dimension)
            if (response == "" or response is None):
                Profile.add_dimension(dimension=dimension, new_summary=summary)

        response = llm.generate([message])
        json_prep = response.generations[0][0].text
        if("[]" in json_prep or "[{}]" in json_prep):
            json_prep = {}

        print(json_prep)
        json_response = json.loads(json_prep)

        updated_dimensions = []

        for event in json_response:
            if event["dimension"] not in updated_dimensions:
                updated_dimensions.append(event["dimension"])
            Event.save_event_to_db(event)

        for dimension in updated_dimensions:
            current_summary = Profile.get_dimension(dimension)

            dimension_updates = ""
            for event in json_response:
                if (event["dimension"] == dimension):
                    dimension_updates += " - " + event["event"] + "\n"

            print(dimension_updates)

            response = llm.generate([f"""
            Here is summary of {dimension} dimension:
            {current_summary}

            Here are the updates:
            {dimension_updates}

            If the updates are significant update the summary with new information. If not just send back the previous summary. Return in json with one field text.
            """])

            json_prep = response.generations[0][0].text
            if("[]" in json_prep or "[{}]" in json_prep):
                json_prep = {}

            print(json_prep)
            json_subresponse = json.loads(json_prep)

            Profile.update_dimension(dimension=dimension, new_summary=json_subresponse)

        return response