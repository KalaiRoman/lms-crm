import task_shema from "../../Models/task_shema.js";

// create
export const createTask = async (req, res) => {

    const { title, description, task } = req.body;
    try {
        const existingTitlte = await task_shema.findOne({ title: title });
        if (existingTitlte) res.status(404).json({ message: "Already Existing Title" });
        const response = await task_shema({
            title, description, task, user: req.userid
        })
        await response.save();;
        res.status(201).json({ message: "Created Task" })

    } catch (error) {
        res.status(404).json({ message: "Task Create Error!.." })
    }
}

// get all
export const getallTask = async (req, res) => {
    try {

    } catch (error) {

    }
}

// single

export const getsingleTask = async (req, res) => {
    try {

    } catch (error) {

    }
}

// update

export const updateTask = async (req, res) => {
    try {

    } catch (error) {

    }
}

// delete

export const deleteTask = async (req, res) => {
    try {

    } catch (error) {

    }
}