"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateList = exports.getList = exports.deleteList = exports.editList = exports.shoppingList = void 0;
const shoppingList_1 = __importDefault(require("../models/shoppingList"));
// CREATE articles shopping list
const shoppingList = async (req, res, next) => {
    const { listName, userId, articles } = req.body;
    try {
        const userLists = new shoppingList_1.default({
            listName,
            userId,
            articles
        });
        await userLists.save().then(list => {
            return res.status(201).json({
                list
            });
        }).catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
};
exports.shoppingList = shoppingList;
// PATCH shopping list
const editList = async (req, res) => {
    const { id } = req.params;
    const listData = req.body;
    try {
        if (!listData) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }
        await shoppingList_1.default.findByIdAndUpdate(id, listData, { useFindAndModify: false, new: true }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update List with id=${id}. Maybe List was not found!`
                });
            }
            else {
                return res.status(202).json({ message: "List was updated successfully.", data });
            }
        })
            .catch(err => {
            res.status(500).send({
                message: `Error updating List with id=${id}`,
                error: err
            });
        });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
};
exports.editList = editList;
// DELETE shopping list
const deleteList = async (req, res, next) => {
    const { id } = req.params;
    try {
        await shoppingList_1.default.deleteOne({ _id: id }).then(() => {
            return res.status(200).json({ message: "List delete successfully" });
        }).catch(error => {
            return res.status(500).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.deleteList = deleteList;
// GET list by id
const getList = async (req, res) => {
    const { userId } = req.params;
    try {
        const list = await shoppingList_1.default.find({ userId });
        if (list) {
            return res.status(200).json(list);
        }
        else {
            return res.status(500).json('No lists found');
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.getList = getList;
// AGGREGATE within time range
const aggregateList = async (req, res) => {
    const { startDate, endDate } = req.body;
    console.log(startDate);
    console.log(endDate);
    try {
        const aggregateGroup = await shoppingList_1.default.aggregate([
            {
                $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } }
            },
        ]);
        if (aggregateGroup) {
            res.status(200).json({ aggregateGroup });
        }
        console.log(aggregateGroup);
    }
    catch (error) {
        console.log('error');
        res.status(500).json({ message: error });
    }
};
exports.aggregateList = aggregateList;
//# sourceMappingURL=list.js.map