import React from "react";
import "./App.css";

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartBaseDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CoursePartBaseDescription {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
interface CourseSubmissionPart extends CoursePartBaseDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CoursePartBaseDescription {
    type: "special";
    requirements: string[];
}

type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <br />
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>project exercises {part.groupProjectCount}</div>
                    <br />
                </div>
            );
        case "submission":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        submit to <a href="#">{part.exerciseSubmissionLink}</a>
                    </div>
                    <br />
                </div>
            );
        case "special":
            return (
                <div>
                    <b>
                        {part.name} {part.exerciseCount}
                    </b>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>required skills: {part.requirements.join(", ")}</div>
                    <br />
                </div>
            );
        default:
            return assertNever(part);
    }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            <Part part={courseParts[0]} />
            <Part part={courseParts[1]} />
            <Part part={courseParts[2]} />
            <Part part={courseParts[3]} />
            <Part part={courseParts[4]} />
        </div>
    );
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    );
};

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the leisured course part",
            type: "normal",
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the harded course part",
            type: "normal",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject",
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink:
                "https://fake-exercise-submit.made-up-url.dev",
            type: "submission",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special",
        },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;
