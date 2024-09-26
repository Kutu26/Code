document.addEventListener('DOMContentLoaded', function() {
    const maleButton = document.getElementById('male');
    const femaleButton = document.getElementById('female');
    const bmiManImage = document.getElementById('bmi-man');
    const bmiWomanImage = document.getElementById('bmi-woman');
    const weightInput = document.getElementById('Weight');
    const heightInput = document.getElementById('Height');
    const weightUnitSelect = document.getElementById('WeightUnit');
    const heightUnitSelect = document.getElementById('HeightUnit');
    const resultDiv = document.getElementById('result');
    const arrowWrapper = document.querySelector('.arrow-wrapper');

    let selectedGender = null; 

    
    bmiManImage.style.display = 'none';
    bmiWomanImage.style.display = 'none';

    
    function selectGender(gender) {
        if (gender === 'male' && selectedGender !== 'male') {
            selectedGender = 'male';
            maleButton.classList.add('active');
            femaleButton.classList.remove('active');
            bmiManImage.style.display = 'block';
            bmiWomanImage.style.display = 'none';
        } else if (gender === 'female' && selectedGender !== 'female') {
            selectedGender = 'female';
            femaleButton.classList.add('active');
            maleButton.classList.remove('active');
            bmiManImage.style.display = 'none';
            bmiWomanImage.style.display = 'block';
        }
    }

    
    maleButton.addEventListener('click', () => {
        selectGender('male');
    });

    femaleButton.addEventListener('click', () => {
        selectGender('female');
    });


    
    function calculateBMI() {
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);

        
        if (weightUnitSelect.value === 'lbs') {
            weight = weight * 0.453592; 
        }
        if (heightUnitSelect.value === 'ft') {
            height = height * 30.48; 
        }

        
        let heightInMeters = height / 100;
        let bmi = weight / (heightInMeters * heightInMeters);
        bmi = bmi.toFixed(1); 

        return bmi;
    }

   
    function updateGaugeAndResult() {
        const bmi = calculateBMI();
        
        if (isNaN(bmi) || bmi <= 0) {
            resultDiv.textContent = 'BMI';
            arrowWrapper.style.transform = 'rotate(0deg)';
            return;
        }

       
        resultDiv.textContent = `BMI: ${bmi}`;

        
        let arrowRotation;
        if (bmi < 18.5) {
            arrowRotation = 65; 
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            arrowRotation = 115; 
        } else if (bmi >= 25 && bmi <= 29.9) {
            arrowRotation = 180;
        } else if (bmi >= 30 && bmi <= 34.9) {
            arrowRotation = 245; 
        } else if (bmi >= 35) {
            arrowRotation = 295; 
        }

        arrowWrapper.style.transform = `rotate(${arrowRotation}deg)`;
    }

    
    weightInput.addEventListener('input', updateGaugeAndResult);
    heightInput.addEventListener('input', updateGaugeAndResult);
    weightUnitSelect.addEventListener('change', updateGaugeAndResult);
    heightUnitSelect.addEventListener('change', updateGaugeAndResult);
});
