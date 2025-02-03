import videoModel from "../Model/videos.Model.js";

export async function GetVideos(req, res) {
    try {

        const videoDetails = await videoModel.find();

        if (!videoDetails) {
            return res.status(404).send({ message: "Video doesn't exist!" });
        }

        res.status(200).send(videoDetails);
    } catch (error) {
        res.send({ message: "An error occurred", error: error.message });
    }
}

