import classes from './Input.module.css';
const Input = (props) => {
  return (
    <div className={classes.input}>
      <label
        htmlFor={props.input.id}
        onClick={(e) => {
          console.log(e.target);
          console.log('Run');
        }}
      >
        {props.label}
      </label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
