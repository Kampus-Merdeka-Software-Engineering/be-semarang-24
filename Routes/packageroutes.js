import express, {Router} from "express";
import sendpackage from "../Models/sendpackagesmodels.js";
import { QueryTypes } from "sequelize";

const router = express.Router();

router.get("/packages/:idrecipt", async(req, res) => {
    try {
        const result = await sendpackage.sequelize.query('SELECT * FROM packages u WHERE u.idreceipt = ?', {
            replacements: [req.params.idrecipt],
            type: QueryTypes.SELECT
        });
        res.status(201).json({msg: "Package Found", result: result});
    } catch (error) {
        res.send(error.message)
    };
});

router.get("/packages", async (req, res) => {
    try {
    const result = await sendpackage.sequelize.query('SELECT * FROM sendpackages_db.packages', {
        replacements: [req.params.idrecipt],
            type: QueryTypes.SELECT
    });
    res.status(200).json({message: 'All Package Found', result: result});
    } catch (error) {
    res.send(error.message)
    };
});

router.post("/packages", async(req, res) => {
    try {
        await sendpackage.create(req.body);
        res.status(201).json({msg: "Package Added"})
    } catch (error) {
        res.send(error.message)
    };
});

router.put("/packages/:idreceipt", async(req, res) => {
    try {
        const result = await sendpackage.sequelize.query('UPDATE packages u SET u.cityfrom = ? WHERE u.idreceipt = ?', {
            replacements: [req.body.cityfrom, req.params.idreceipt],
            type: QueryTypes.UPDATE
        });
        res.status(201).json({msg: "Package Successfully Updated", result: result});
    } catch (error) {
        res.send(error.message)
    };
});

router.delete("/packages/:idrecipt", async (req, res) => {
    try {
        const idreceipt = req.params.idrecipt;
        const fetchedData = await sendpackage.findOne({where: {idreceipt: idreceipt}});
        await fetchedData.destroy({msg: "Success Delete!"});
        res.status(201).json();
    } catch (error) {
        res.send(error.message)
    };
});

export default router;