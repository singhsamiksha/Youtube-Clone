export async function postUser(username, email, password, image) {
    try {
        const response = await fetch("http://localhost:3000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                image: image,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const data = await response.json();
        console.log("User Created:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getUsers() {
    try {
        const response = await fetch("http://localhost:3000/user/signin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to find any user!");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return []; 
    }
}

