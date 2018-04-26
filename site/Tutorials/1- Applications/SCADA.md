# A Simple SCADA App

## What are we going to build?

In this brief tutorial, we will be building a very simple SCADA app (**S**upervisory **C**ontrol **A**nd **D**ata **A**quisition).  For out purposes here, we will be creating a headless (application without a pretty UI 😦) service to watch a set of tags and capture data at appropriate instances of time.

## How will it work?

For us to implement a simple SCADA app, we will need to determine what circumstances we will be using to notify our app when to pull relavant data.  Lets start by making a tag stucture within the PLC to organize process data. Let's imagine we have several 