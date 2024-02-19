import "./Task.css";

export default function Task({ task }) {

  return (
    <div className="task">
      <p><span className="fa-regular fa-square"></span>{task.name}</p>
    </div>
  )
}