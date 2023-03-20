import { Router } from "express";
import {addVote, getallVotes} from "../Controllers/votecontrollers";

const voteroute =Router()

voteroute.post('/add',addVote)
voteroute.get('/allvotes',getallVotes)

export default voteroute