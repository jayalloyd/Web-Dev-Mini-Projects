const form = document.querySelector("form")

form.addEventListener("submit",(e) => {
    e.preventDefault()
    const height = parseInt(document.querySelector("#height").value);
    const weight = parseInt(document.querySelector("#weight").value);
    const result = document.querySelector(".result");

    if ((height === " " || height < 0 || isNaN(height)) && (weight === " " || weight < 0 || isNaN(weight))) {
        result.innerHTML = "Please give a valid height and weight";
    } else if (height === " " || height < 0 || isNaN(height)) {
        result.innerHTML = "Please give a valid height";
    } else if (weight === " " || weight < 0 || isNaN(weight)) {
        result.innerHTML = "Please give a valid weight";
    } else {
        const bmi = (weight/((height * 0.3048)**2)).toFixed(2);
        if (bmi < 18.5) {
            result.innerHTML = `Your BMI is ${bmi}. You're underweight. It's important to maintain a balanced diet and consider consulting a healthcare professional to ensure you're getting enough nutrients.`
        }
        else if (bmi < 25) {
            result.innerHTML = `Your BMI is ${bmi}. Great job! Your BMI is in the normal range. Keep up the healthy lifestyle with a balanced diet and regular exercise.`
        }
        else if (bmi < 30) {
            result.innerHTML = `Your BMI is ${bmi}. You're slightly overweight. Regular exercise and a healthy diet can help you reach an optimal weight for better well-being.`
        }
        else if (bmi < 35) {
            result.innerHTML = `Your BMI is ${bmi}. You are in the Obese (Class 1) category. It's recommended to adopt healthier eating habits and an active lifestyle to reduce potential health risks.`
        }
        else if (bmi < 40) {
            result.innerHTML = `Your BMI is ${bmi}. Your BMI falls under Obese (Class 2). This may lead to health complications. Consider seeking guidance from a medical professional to develop a healthier lifestyle plan.`
        }
        else {
            result.innerHTML = `Your BMI is ${bmi}. Your BMI indicates severe obesity (Class 3). This can increase health risks. It's strongly advised to consult a doctor for personalized health guidance and lifestyle changes.`
        }
    }




    
})