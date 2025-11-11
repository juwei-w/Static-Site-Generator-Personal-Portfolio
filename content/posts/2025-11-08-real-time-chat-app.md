---
title: "Building a Real-Time Chat Application"
date: 2025-11-08
status: published
description: "A detailed look at my recent project: a real-time chat application built with Node.js and WebSockets."
author: "Wong Ju Wei"
slug: "real-time-chat-app"
---

# Building a Real-Time Chat Application

One of my most exciting recent projects was developing a real-time chat application for a client who needed to facilitate team communication across remote offices.

## The Challenge

The client needed:
- Instant message delivery
- Support for multiple chat rooms
- User presence indicators
- Message history
- Mobile-responsive design

## Technology Stack

I chose the following technologies:

- **Backend**: Node.js with Express
- **Real-Time**: Socket.IO for WebSocket connections
- **Database**: MongoDB for message persistence
- **Frontend**: Vanilla JavaScript (no frameworks)
- **Styling**: Tailwind CSS

## Key Features Implemented

### 1. Real-Time Messaging
Using Socket.IO, messages are delivered instantly to all connected users in a room. The implementation handles reconnection gracefully and ensures no messages are lost.

### 2. User Presence
Online/offline status is tracked using Socket.IO events, giving users visibility into who's available to chat.

### 3. Message History
All messages are stored in MongoDB, allowing users to scroll back through conversation history even after disconnecting.

## Lessons Learned

This project taught me valuable lessons about:
- Managing WebSocket connections at scale
- Optimizing database queries for chat history
- Handling edge cases like network disconnections
- Building responsive UIs that work on all devices

## Results

The client was thrilled with the outcome. The application now serves over 200 daily active users across three offices, facilitating seamless team communication.

Want to learn more about this project? Feel free to reach out!
