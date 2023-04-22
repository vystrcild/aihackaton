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
import json

load_dotenv()

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

         You response will be array of json objects with field dimension, event, sentiment. No explanation. If there is no event, just return empty json.

         Daily log: {user_message}
         """
        response = llm.generate([message])
        json_response = json.loads(response.generations[0][0].text)

        for event in json_response:
            Event.save_event_to_db(event)

        return response