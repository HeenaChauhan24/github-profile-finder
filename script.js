

const searchBtn = document.querySelector("#searchBtn");
const usernameInput = document.querySelector("#username");
const profile = document.querySelector("#profile");
const message = document.querySelector("#message");

// Search button event
searchBtn.addEventListener("click", getProfile);

// Also search when Enter is pressed
usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getProfile();
    }
});

// Async function to fetch GitHub profile
async function getProfile() {

    const username = usernameInput.value.trim();

    if (username === "") {
        message.textContent = "Please enter a username!";
        profile.innerHTML = "";
        return;
    }

    message.textContent = "Loading...";
    profile.innerHTML = "";

    try {
        // Fetch API request
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`
        );

        // Check if user exists
        if (!response.ok) {
            throw new Error("GitHub user not found!");
        }

        // Convert JSON into JavaScript object
        const data = await response.json();

        message.textContent = "";

        // Display profile using DOM
        profile.innerHTML = `
            <div class="profile-card">

                <img src="${data.avatar_url}" alt="GitHub avatar">

                <h2>${data.name || data.login}</h2>

                <p>@${data.login}</p>

                <p>${data.bio || "No bio available"}</p>

                <div class="stats">

                    <div>
                        <strong>${data.followers}</strong>
                        <p>Followers</p>
                    </div>

                    <div>
                        <strong>${data.following}</strong>
                        <p>Following</p>
                    </div>

                    <div>
                        <strong>${data.public_repos}</strong>
                        <p>Repositories</p>
                    </div>

                </div>

                <p>Location: ${data.location || "Not available"}</p>

                <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">
                    View GitHub Profile
                </a>

            </div>
        `;

    } catch (error) {

        message.textContent = error.message;
        profile.innerHTML = "";

    }
}
