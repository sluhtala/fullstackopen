type bmiResult =
    | "Very severely underweight"
    | "Severely underweight"
    | "Very severely underweight"
    | "Severely underweight"
    | "Underweight"
    | "Normal (healthy weight)"
    | "Overweight"
    | "Obese Class I (Moderately obese)"
    | "Obese Class II (Severely obese)"
    | "Obese Class III (Very severely obese)"
    | null;

export function calculateBmi(height: number, weigth: number): bmiResult {
    if (weigth <= 0) throw new Error("Weigth must be positive non-zero number");
    const heghtInM = height / 100;
    const bmi = weigth / (heghtInM * heghtInM);
    if (bmi < 15) return "Very severely underweight";
    else if (bmi >= 15 && bmi < 16) return "Severely underweight";
    else if (bmi >= 16 && bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)";
    else if (bmi >= 25 && bmi < 30) return "Overweight";
    else if (bmi >= 30 && bmi < 35) return "Obese Class I (Moderately obese)";
    else if (bmi >= 35 && bmi < 40) return "Obese Class II (Severely obese)";
    else if (bmi >= 40) return "Obese Class III (Very severely obese)";
    return null;
}

interface values {
    height: number;
    weigth: number;
}

function bmiParseArguments(args: Array<string>): values {
    if (args.length !== 4)
        throw new Error(
            `Invalid amount of arguments. Usage: ./${process.argv[1]} <height> <weight>`
        );
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weigth: Number(args[3]),
        };
    } else {
        throw new Error("arguments need to be numbers");
    }
}

try {
    const { height, weigth } = bmiParseArguments(process.argv);
    console.log(calculateBmi(height, weigth));
} catch (e) {
	if (e instanceof Error)
		console.log(`something went wrong: ${e.message}`);
}
//console.log(calculateBmi(180, 74));

export default calculateBmi ;
