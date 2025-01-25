import channelModel from "../Model/channels.Model.js";

export function channelCreate(req, res) {
    const { channelName, owner, description, channelBanner, subscribers, videos } = req.body;

    const newChannel = new channelModel({
        channelName,
        owner,
        description,
        channelBanner,
        subscribers,
        videos,
    });

    newChannel
        .save()
        .then((data) => {
            if (!data) {
                return res.status(400).json({ message: "Something went wrong!" });
            }
            res.status(201).send(data);
        })
        .catch((error) => {
            res.status(500).json({ message: "Internal server error", error: error.message });
        });
}

export async function channelGet(req, res) {
    try {
        const { owner } = req.body;

        if (!owner) {
            return res.status(400).json({ message: "Owner ID is required" });
        }

        const channelDetails = await channelModel.findOne({ owner });

        if (!channelDetails) {
            return res.status(404).send({ message: "Channel not found for this owner!" });
        }

        res.status(200).send(channelDetails);
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error: error.message });
    }
}
