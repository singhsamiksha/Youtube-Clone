import videoModel from "../Model/videos.Model.js";

export async function GetVideos(req, res) {
    try {
        const { title } = req.query; 
        if (!title) {
            return res.status(400).send({ message: "Title is required!" });
        }

        const videoDetails = await videoModel.findOne({ title });

        if (!videoDetails) {
            return res.status(404).send({ message: "Video doesn't exist!" });
        }

        res.status(200).send(videoDetails);
    } catch (error) {
        res.send({ message: "An error occurred", error: error.message });
    }
}

