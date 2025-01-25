import channelModel from "../Model/channels.Model.js";

// Controller to create a new channel
export function channelCreate(req, res) {
    const { channelName, owner, description, channelBanner, subscribers, videos } = req.body;

    if (!channelName || !owner) {
        return res.status(400).json({ message: "channelName and owner are required" });
    }

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
        .then((data) => res.status(201).send(data))
        .catch((error) => res.status(500).json({ message: "Internal server error", error: error.message }));
}

// Controller to get a channel by owner
export function channelGet(req, res) {
    const { owner } = req.query;

    if (!owner) {
        return res.status(400).json({ message: "Owner ID is required" });
    }

    channelModel
        .findOne({ owner })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Channel not found" });
            }
            res.status(200).send(data);
        })
        .catch((error) => res.status(500).json({ message: "Internal server error", error: error.message }));
}
