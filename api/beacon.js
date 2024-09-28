// beacon.js

// Fetch all beacons from the database and display them
async function fetchBeacons() {
    const response = await fetch('/api/admin/beacon');
    const beacons = await response.json();

    const beaconList = document.getElementById('beacon-list');
    beaconList.innerHTML = '';

    beacons.forEach(beacon => {
        const li = document.createElement('li');
        li.textContent = `${beacon.name} at (${beacon.coordinates.lat}, ${beacon.coordinates.lng})`;
        beaconList.appendChild(li);
    });
}

// Add a new beacon
async function addBeacon(name, lat, lng) {
    const response = await fetch('/api/admin/beacon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, coordinates: { lat, lng } })
    });

    if (response.ok) {
        alert('Beacon added successfully');
        fetchBeacons();
    } else {
        alert('Error adding beacon');
    }
}

// Delete a beacon
async function deleteBeacon(id) {
    const response = await fetch(`/api/admin/beacon/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Beacon deleted successfully');
        fetchBeacons();
    } else {
        alert('Error deleting beacon');
    }
}

// Event listeners for forms
document.getElementById('add-beacon-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('beacon-name').value;
    const lat = document.getElementById('beacon-lat').value;
    const lng = document.getElementById('beacon-lng').value;

    addBeacon(name, lat, lng);
});

document.getElementById('delete-beacon-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('beacon-id').value;

    deleteBeacon(id);
});
