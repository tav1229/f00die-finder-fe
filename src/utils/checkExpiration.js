export function checkExpiration() {
    const timeValue = localStorage.getItem("accessTokenExpiryTime");
    if (!timeValue) {
        return true;
    }
    // Convert the time string to a Date object
    const expirationTime = new Date(timeValue);
    const currentTime = new Date();

    // Compare the current time with the expiration time
    return currentTime > expirationTime;
}

