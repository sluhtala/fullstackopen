import React from "react";
import { Entry as EntryType, HealthCheckRating as hcr } from "../types";
import { useStateValue } from "../state";
import { Segment, Icon } from "semantic-ui-react";

const DCode = ({ code }: { code: string }) => {
    const [{ diagnosis }] = useStateValue();
    const description = diagnosis.find((d) => d.code === code)?.name;
    return (
        <li>
            {code} {description}
        </li>
    );
};

const assertNever = (param: never): never => {
    throw new Error(`Unhandled unionmember: ${JSON.stringify(param)}`);
};

const EntrySpecific = ({ entry }: { entry: EntryType }) => {
    switch (entry.type) {
        case "Hospital":
            return (
                <div>
                    discharge: {entry.discharge.date} {entry.discharge.criteria}
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <>
                    Employer: <b>{entry.employerName}</b>
                </>
            );
        case "HealthCheck":
            if (entry.healthCheckRating === hcr.LowRisk)
                return <Icon name="heart" color="yellow" />;
            if (entry.healthCheckRating === hcr.Healthy)
                return <Icon name="heart" color="green" />;
            if (entry.healthCheckRating === hcr.HighRisk)
                return <Icon name="heart" color="orange" />;
            if (entry.healthCheckRating === hcr.CriticalRisk)
                return <Icon name="heart" color="red" />;
            return <></>;
        default:
            return assertNever(entry);
    }
};

const EntryIcon = ({ entry }: { entry: EntryType }) => {
    switch (entry.type) {
        case "Hospital":
            return <Icon name="hospital outline" size="large" />;
        case "OccupationalHealthcare":
            return <Icon name="doctor" size="large" />;
        case "HealthCheck":
            return <Icon name="stethoscope" size="large" />;
        default:
            return assertNever(entry);
    }
};
const Entry = ({ entry }: { entry: EntryType }): JSX.Element => {
    const dcodes = entry.diagnosisCodes;
    return (
        <div>
            <div>
                <h3>
                    {entry.date}
                    <EntryIcon entry={entry} />
                </h3>
                {entry.description}
            </div>
            <EntrySpecific entry={entry} />
            {dcodes ? (
                <ul>
                    {dcodes.map((c: string) => (
                        <DCode key={c} code={c} />
                    ))}
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
};

const Entries = ({ entries }: { entries: EntryType[] }): JSX.Element => {
    return (
        <div>
            <h3>entries</h3>
            <Segment.Group>
                {entries.map((e) => (
                    <Segment key={e.id}>
                        <Entry key={e.id} entry={e} />
                    </Segment>
                ))}
            </Segment.Group>
        </div>
    );
};

export default Entries;
