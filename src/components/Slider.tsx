import styles from "@components/Slider.module.scss";
import Util from "@util/index";
import { forwardRef } from "react";
import omit from "omit";

type SliderProps = JSX.IntrinsicElements["input"];

const Slider = forwardRef<HTMLInputElement, SliderProps>((props, ref) => (
  <input
    {...omit("children", props)}
    ref={ref}
    type="range"
    className={Util.classNames(
      "bg-cocgreenbackground rounded-xl appearance-none w-full h-1/5 outline-none opacity-70 transition-opacity duration-200 hover:opacity-100",
      styles.slider,
      props.className
    )}
  />
));
export default Slider;
