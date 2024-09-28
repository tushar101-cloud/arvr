// location.js

// Fetch all locations from the database and display them
async function fetchLocations() {
    const response = await fetch('/api/admin/location');
    const locations = await response.json();

    const locationList = document.getElementById('location-list');
    locationList.innerHTML = '';

    locations.forEach(location => {
        const li = document.createElement('li');
        li.textContent = `${location.name} (${location.coordinates.lat}, ${location.coordinates.lng})`;
        locationList.appendChild(li);
    });
}

// Add a new location
async function addLocation(name, lat, lng) {
    const response = await fetch('/api/admin/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, coordinates: { lat, lng } })
    });

    if (response.ok) {
        alert('Location added successfully');
        fetchLocations();
    } else {
        alert('Error adding location');
    }
}

// Delete a location
async function deleteLocation(id) {
    const response = await fetch(`/api/admin/location/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Location deleted successfully');
        fetchLocations();
    } else {
        alert('Error deleting location');
    }
}

// Event listeners for forms
document.getElementById('add-location-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('location-name').value;
    const lat = document.getElementById('location-lat').value;
    const lng = document.getElementById('location-lng').value;

    addLocation(name, lat, lng);
});

document.getElementById('delete-location-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('location-id').value;

    deleteLocation(id);
});
