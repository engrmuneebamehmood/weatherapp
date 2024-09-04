document.addEventListener("DOMContentLoaded", () => {
    const temperature_field = document.querySelector(".temp");
    const location_field = document.querySelector(".time_location p");
    const date_field = document.querySelector(".time_location span");
    const condition_field = document.querySelector(".condition p");
    const search_field = document.querySelector(".search_area");
    const search_button_field = document.querySelector(".search_button");
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", searchlocation);
    } else {
        console.error("Form element not found");
    }

    let target = "pindigheb";

    const fetchweather = async (targetlocation) => {
        try {
            let url = `http://api.weatherapi.com/v1/current.json?key=74c651f5faa946079e4120737242608&q=${target}&aqi=no`;

            const fetched_result = await fetch(url);
            const show_weather = await fetched_result.json();

            console.log(show_weather); // Log the entire response to inspect it

            let temp = show_weather.current.temp_c;
            let location_name = show_weather.location.name;
            let location_time = show_weather.location.localtime;
            let condition = show_weather.current.condition.text;

            updateweather(temp, location_name, location_time, condition);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    function updateweather(temp, location_name, location_time, condition) {
        // Ensure location_time is split correctly
        let [date, time] = location_time.split(' ');

        // Check if the date and time are split correctly
        if (!date || !time) {
            console.error("Date and time not split correctly:", location_time);
            return;
        }

        // Create a Date object to get the correct day
        let dateObject = new Date(date);
        let dayName = getDayName(dateObject.getDay());

        // Update the fields
        temperature_field.innerText = `${temp}°C`;
        location_field.innerText = location_name;
        date_field.innerText = `${dayName}, ${date} ${time}`;
        condition_field.innerText = condition;
    }

    function searchlocation(s) {
        s.preventDefault();
        target = search_field.value;
        fetchweather(target);
    }

    fetchweather(target);

    function getDayName(dayIndex) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayIndex];
    }
});
