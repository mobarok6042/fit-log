import React from 'react';

const WorkoutsPage = async() => {

const res = await fetch ('https://api.abcz.workers.dev/api/fitlog');
const workouts = res.json;

    return (
        <div>
            <h1>There are {workouts.lengh} workouts</h1>
        </div>
    );
};

export default WorkoutsPage;