from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import openai

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure MongoDB
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/helloagain")
mongo = PyMongo(app)

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# Routes
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "timestamp": str(datetime.utcnow())})

# Auth routes
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if mongo.db.users.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 400
    
    # Create new user
    user = {
        "email": data["email"],
        "displayName": data["displayName"],
        "timezone": data["timezone"],
        "notificationPreferences": {
            "email": True,
            "inApp": True,
            "pushNotifications": False,
            "birthdayReminders": {
                "enabled": True,
                "daysInAdvance": [1, 3, 7]
            },
            "checkInReminders": True
        },
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    # TODO: Add password hashing
    user["password"] = data["password"]
    
    result = mongo.db.users.insert_one(user)
    user["_id"] = str(result.inserted_id)
    
    return jsonify({"message": "User registered successfully", "user": user}), 201

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    
    user = mongo.db.users.find_one({"email": data["email"]})
    if not user or user["password"] != data["password"]:  # TODO: Add proper password comparison
        return jsonify({"error": "Invalid credentials"}), 401
    
    # TODO: Add JWT token generation
    return jsonify({
        "message": "Login successful",
        "user": {
            "id": str(user["_id"]),
            "email": user["email"],
            "displayName": user["displayName"]
        }
    })

# Contact routes
@app.route("/api/contacts", methods=["GET"])
def get_contacts():
    # TODO: Add authentication
    user_id = request.args.get("userId")
    contacts = list(mongo.db.contacts.find({"userId": user_id}))
    
    # Convert ObjectId to string
    for contact in contacts:
        contact["_id"] = str(contact["_id"])
    
    return jsonify(contacts)

@app.route("/api/contacts", methods=["POST"])
def create_contact():
    data = request.get_json()
    
    contact = {
        "userId": data["userId"],
        "fullName": data["fullName"],
        "nickname": data.get("nickname"),
        "phoneNumber": data.get("phoneNumber"),
        "email": data.get("email"),
        "birthday": data.get("birthday"),
        "relationshipType": data.get("relationshipType"),
        "categories": data.get("categories", []),
        "customFields": data.get("customFields", {}),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    result = mongo.db.contacts.insert_one(contact)
    contact["_id"] = str(result.inserted_id)
    
    return jsonify(contact), 201

@app.route("/api/contacts/<contact_id>", methods=["GET"])
def get_contact(contact_id):
    contact = mongo.db.contacts.find_one({"_id": contact_id})
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    
    contact["_id"] = str(contact["_id"])
    return jsonify(contact)

@app.route("/api/contacts/<contact_id>", methods=["PUT"])
def update_contact(contact_id):
    data = request.get_json()
    data["updatedAt"] = datetime.utcnow()
    
    result = mongo.db.contacts.update_one(
        {"_id": contact_id},
        {"$set": data}
    )
    
    if result.modified_count == 0:
        return jsonify({"error": "Contact not found"}), 404
    
    contact = mongo.db.contacts.find_one({"_id": contact_id})
    contact["_id"] = str(contact["_id"])
    return jsonify(contact)

@app.route("/api/contacts/<contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    result = mongo.db.contacts.delete_one({"_id": contact_id})
    if result.deleted_count == 0:
        return jsonify({"error": "Contact not found"}), 404
    
    return jsonify({"message": "Contact deleted successfully"})

# Life Events routes
@app.route("/api/contacts/<contact_id>/events", methods=["GET"])
def get_life_events(contact_id):
    events = list(mongo.db.life_events.find({"contactId": contact_id}))
    for event in events:
        event["_id"] = str(event["_id"])
    
    return jsonify(events)

@app.route("/api/contacts/<contact_id>/events", methods=["POST"])
def create_life_event(contact_id):
    data = request.get_json()
    
    event = {
        "contactId": contact_id,
        "eventType": data["eventType"],
        "date": data["date"],
        "description": data["description"],
        "media": data.get("media", []),
        "createdAt": datetime.utcnow()
    }
    
    result = mongo.db.life_events.insert_one(event)
    event["_id"] = str(result.inserted_id)
    
    return jsonify(event), 201

# AI Message Generation route
@app.route("/api/ai/generate-message", methods=["POST"])
def generate_message():
    data = request.get_json()
    
    # Get contact details
    contact = mongo.db.contacts.find_one({"_id": data["contactId"]})
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    
    # Get recent life events
    events = list(mongo.db.life_events.find(
        {"contactId": data["contactId"]}
    ).sort("date", -1).limit(3))
    
    # Prepare context for AI
    context = {
        "contact": {
            "name": contact["fullName"],
            "nickname": contact.get("nickname"),
            "relationship": contact.get("relationshipType")
        },
        "occasion": data["occasion"],
        "recentEvents": [
            {
                "type": e["eventType"],
                "description": e["description"],
                "date": e["date"]
            } for e in events
        ]
    }
    
    # TODO: Implement actual OpenAI call
    # For now, return a mock response
    message = f"Hey {contact['fullName']}! Happy {data['occasion']}! 🎉"
    
    return jsonify({"message": message})

if __name__ == "__main__":
    app.run(debug=True, port=5001) 