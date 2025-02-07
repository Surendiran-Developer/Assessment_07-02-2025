const fs = require('fs');
const ExcelJS = require('exceljs');
const path = require('path');
const { dataTable } = require("../models/data.model")



const fileUpload = async (req , res) => {
    try {

        // const userId = req.userId;
        const { excel } = req.files;

        const filePath = excel[0].path;
        console.log(filePath);
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log(sheetData);

        const datas = await dataTable.insertMany(sheetData);
        
        return res.status(200).json({
            Result : true,
            Message : 'Added SuccessFully!',
            data : datas
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
};

const deleteInfo = async (req , res) => {
    try {
        
        const Id = req.params.id;

        const deletedInfo = await dataTable.findOneAndDelete({_id : Id});
        
        return res.status(200).json({
            Result : true,
            Message : 'Deleted SuccessFully!',
            data : deletedInfo
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const updateInfo = async (req , res) => {
    try {
        
        const Id = req.params.id;
        const { FirstName, LastName, Role, DOB, Gender, Email, Mobile, City, State } = req.body;

        const updateInfo = {
            FirstName : FirstName,
            LastName : LastName,
            Role : Role,
            DOB : DOB,
            Gender : Gender,
            Email : Email,
            Mobile : Mobile,
            City : City,
            State : State
        };

        const updatedInfo = await dataTable.findOneAndUpdate({_id : Id} , updateInfo , {new:true});

        return res.status(200).json({
            Result : true,
            Message : 'Updated SuccessFully!',
            data : updatedInfo
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const readInfo = async (req , res) => {
    try {
        
        

        const readInfo = await dataTable.find({});

        return res.status(200).json({
            Result : true,
            Message : 'Read SuccessFully!',
            data : readInfo
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const readData = async (req , res) => {
    try {
        const users = await dataTable.find().lean();
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');
    
        worksheet.columns = [
          { header: 'ID', key: '_id', width: 25 },
          { header: 'FirstName', key: 'FirstName', width: 30 },
          { header: 'LastName', key: 'LastName', width: 30 },
          { header: 'Role', key: 'Role', width: 30 },
          { header: 'DOB', key: 'DOB', width: 30 },
          { header: 'Gender', key: 'Gender', width: 30 },
          { header: 'Email', key: 'Email', width: 30 },
          { header: 'Mobile', key: 'Mobile', width: 30 },
          { header: 'City', key: 'City', width: 30 },
          { header: 'State', key: 'State', width: 30 },
        ];
    
        worksheet.addRows(users);
    
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
    
        const filePath = './exports/users.xlsx';
        await workbook.xlsx.writeFile(filePath);
        console.log(`File saved at ${filePath}`);
        res.download(filePath, 'users.xlsx', (err) => {
            if (err) {
              console.error('Error sending file:', err);
              res.status(500).send('Error downloading file');
            }
        });
      } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).send('Failed to export data to Excel');
      }
}

module.exports = {
    fileUpload,
    deleteInfo,
    updateInfo,
    readInfo,
    readData
}