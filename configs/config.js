require("dotenv").config()
const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const {connection}= require("../configs/config")

const {authRouter}=require("../routes/authRoutes")l

module.exports={connection}