import ShoppingList from '../models/shoppingList';
import {Request, Response, NextFunction} from 'express';

// CREATE articles shopping list
export const shoppingList = async (req: Request, res: Response, next: NextFunction) => {
    const {listName, userId, articles} = req.body;
    
    try{
        const userLists = new ShoppingList({
            listName,
            userId,
            articles
        })

        await userLists.save().then(list => {
            return res.status(201).json({
                list
            });
        }).catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
    }catch(error){
        res.status(500).json({
            error: error
        })
    }
}

// PATCH shopping list
export const editList = async (req: Request, res: Response) => {
    const {id} = req.params;
    const listData = req.body;
   
    try{
        if(!listData){
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }
        await ShoppingList.findByIdAndUpdate(id, listData, {useFindAndModify: false, new: true}).then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update List with id=${id}. Maybe List was not found!`
              });
            } else {
                return res.status(202).json({ message: "List was updated successfully.", data });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: `Error updating List with id=${id}`,
              error: err
            });
          });
    }catch(error){
        res.status(500).send({message: error});
    }
}
// DELETE shopping list
export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try{
        await ShoppingList.deleteOne({_id: id}).then(() => {
            return res.status(200).json({message: "List delete successfully"});
        }).catch(error => {
            return res.status(500).json({
                error: error
            });
        })
    }catch(error){
        res.status(500).json({error: error});
    }
};

// GET list by id
export const getList = async (req: Request, res: Response) => {
    const {userId} = req.params;

    try{
        const list = await ShoppingList.find({userId});
        if(list){
            return res.status(200).json(list);
        }else{
            return res.status(500).json('No lists found');
        }
    }catch(error){
        res.status(500).json({error: error});
    }
}

// AGGREGATE within time range

export const aggregateList = async (req: Request, res: Response) => {
    const {startDate, endDate} = req.body;
    console.log(startDate)
    console.log(endDate)
    try{
        const aggregateGroup = await ShoppingList.aggregate(
            [
                {
                    $match: {createdAt: {$gte: new Date(startDate), $lte: new Date(endDate)}}
                },
            ]
        );
        if(aggregateGroup){
            res.status(200).json({aggregateGroup})
        }
        console.log(aggregateGroup);
    }catch(error){
        console.log('error')
        res.status(500).json({message: error})
    }
}