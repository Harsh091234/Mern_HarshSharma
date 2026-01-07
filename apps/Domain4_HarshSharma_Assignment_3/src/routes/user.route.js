import { Router } from "express";
import { createUser, deleteUserByEmail, deleteUsersAboveAge, deleteUsersAboveAge2, dropUserCollection, getAllUsers, getSortedUsers, getUsersByCondition, incrementAgeForAll, updateUserRole } from "../controllers/user.controller.js";
const router = Router();

router.post("/create", createUser);
router.get("/get-users", getAllUsers);
router.get("/get-users/age", getUsersByCondition);
router.get("/get-users/sorted", getSortedUsers);
router.patch("/role/:email", updateUserRole);
router.patch("/increment-age", incrementAgeForAll);
router.delete("/delete/:email", deleteUserByEmail);
router.delete("/delete-above-age", deleteUsersAboveAge2);
router.delete("/drop", dropUserCollection);


export default router;