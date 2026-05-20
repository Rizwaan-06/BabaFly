import { motion } from 'framer-motion';

const InputField = ({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  leftIcon,
  rightElement,
  topRight,
}) => {
  return (
    <div className="w-full">
      {/* label row */}
      {(label || topRight) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label
              htmlFor={id}
              className="text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase"
            >
              {label}
            </label>
          )}
          {topRight && topRight}
        </div>
      )}

      {/* input wrapper */}
      <div
        className={`relative flex items-center rounded-lg border transition-all duration-200 ${
          error
            ? 'border-red-500/50 bg-[#161616]'
            : 'border-white/[0.09] bg-[#161616] focus-within:border-white/30 focus-within:bg-[#1c1c1c]'
        }`}
      >
        {leftIcon && (
          <span className="pl-3 text-gray-600 flex-shrink-0">{leftIcon}</span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className="w-full bg-transparent text-white text-[13px] py-2.5 px-3 outline-none placeholder:text-gray-600 caret-white"
        />
        {rightElement && (
          <span className="pr-3 flex-shrink-0">{rightElement}</span>
        )}
      </div>

      {/* error */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-[11px] text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputField;
