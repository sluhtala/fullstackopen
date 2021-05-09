interface trainingResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    avarage: number;
}

function calculateExercises(
    trainingHours: number[],
    target: number
): trainingResult {
    const periodLength = trainingHours.length;
    const trainingDays = trainingHours.filter((h) => h > 0).length;
    const avarage = trainingHours.reduce((a, b) => a + b) / periodLength;
    const success = avarage >= target;
    const difference = avarage - target;
    let ratingDescription: string;

    let rating: number;

    if (difference >= 0) {
        rating = 3;
        ratingDescription = "Good job!";
    } else if (difference < 0 && difference > -1) {
        rating = 2;
        ratingDescription = "so close";
    } else {
        rating = 1;
        ratingDescription = "You need more training";
    }
    return {
        periodLength,
        trainingDays,
        success,
        ratingDescription,
        rating,
        target,
        avarage,
    };
}

function parseArgs(args: Array<string>): number[] {
    if (args.length < 3)
        throw new Error(
            `Invalid amount of arguments. Usage: ./${process.argv[1]} values1 value2...`
        );
    const nums = args.slice(2);
    return nums.map((n) => {
        if (!isNaN(Number(n))) return Number(n);
        else throw new Error("arguments needs to be numbers");
    });
}

try {
    const data = parseArgs(process.argv);
    console.log(calculateExercises(data, 2));
} catch (e) {
	if (e instanceof Error)
		console.log(`something went wrong: ${e.message}`);
}

//let data = [3, 0, 2, 4.5, 0, 3, 1];

//console.log(calculateExercises(data, 2));
export default calculateExercises;