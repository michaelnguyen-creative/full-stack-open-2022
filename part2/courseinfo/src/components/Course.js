const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <h4>
      total of {parts.reduce((sum, { exercises }) => sum + exercises, 0)}{" "}
      exercises
    </h4>
  );
};

export const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);