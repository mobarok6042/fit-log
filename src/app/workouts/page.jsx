import React from 'react';
import WorkoutCard from '../components/WorkoutCard';

const WorkoutsPage = async() => {

const res = await fetch ('https://api.abcz.workers.dev/api/fitlog');
const workouts =await res.json();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:px-10 mx-auto justify-center">
            {
                workouts.map(workout => (<WorkoutCard key={workout.id}
                     workout={workout}
                     
                     ></WorkoutCard>))
            }
        </div>
    );
};

export default WorkoutsPage;