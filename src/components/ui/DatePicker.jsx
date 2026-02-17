import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar } from "lucide-react";

export const DatePicker = ({ value, onChange, disabled = false }) => {
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Get the first day of the month and total days
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month's days - only show last 3 days (29, 30, 31)
  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const daysFromPrevMonth = Math.min(startingDayOfWeek, 3);
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Current month's days
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isToday:
        i === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear(),
      isSelected:
        value &&
        i === new Date(value).getDate() &&
        currentDate.getMonth() === new Date(value).getMonth() &&
        currentDate.getFullYear() === new Date(value).getFullYear(),
    });
  }

  // Next month's days - only show first 2 days
  const remainingDays = Math.max(0, 42 - calendarDays.length);
  const nextMonthDays = Math.min(remainingDays, 2);
  for (let i = 1; i <= nextMonthDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  // Generate year options (current year - 50 to current year + 50)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = currentYear - 50; i <= currentYear + 50; i++) {
    yearOptions.push(i);
  }

  const handleSelectDate = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      // Create date using local date to avoid timezone issues
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      const dateString = `${year}-${month}-${dayStr}`;
      onChange(dateString);
      setIsOpen(false);
    }
  };

  const formattedValue = value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "DD/MM/YYYY";

  return (
    <div className="relative w-full" ref={pickerRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left text-gray-900 font-medium hover:border-gray-400 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-between"
      >
        <span className={value ? "text-gray-900" : "text-[#ADADAD]"}>
          {formattedValue}
        </span>
        <Calendar className="w-5 h-5 text-[#ADADAD]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <div className="bg-gray-100 rounded-lg p-6 w-96 shadow-lg border border-gray-200">
            {/* Header with month/year dropdowns and navigation */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 hover:bg-white rounded-lg transition-colors flex items-center justify-center text-gray-700 font-semibold"
              >
                <span className="text-lg">‹</span>
              </button>

              {/* Month Dropdown */}
              <div className="relative flex-1">
                <select
                  value={currentDate.getMonth()}
                  onChange={handleMonthChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 appearance-none cursor-pointer hover:border-[#663a7e] hover:shadow-sm transition-all pr-8 focus:outline-none focus:ring-2 focus:ring-[#663a7e]/20"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>

              {/* Year Dropdown */}
              <div className="relative flex-1">
                <select
                  value={currentDate.getFullYear()}
                  onChange={handleYearChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 appearance-none cursor-pointer hover:border-[#663a7e] hover:shadow-sm transition-all pr-8 focus:outline-none focus:ring-2 focus:ring-[#663a7e]/20"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 hover:bg-white rounded-lg transition-colors flex items-center justify-center text-gray-700 font-semibold"
              >
                <span className="text-lg">›</span>
              </button>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dayObj, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleSelectDate(dayObj.day, dayObj.isCurrentMonth)
                  }
                  disabled={!dayObj.isCurrentMonth}
                  className={`
                    w-10 h-10 flex items-center justify-center text-sm font-medium rounded transition-all
                    ${
                      dayObj.isSelected
                        ? "bg-[#663a7e] text-white shadow-md hover:bg-[#552f68]"
                        : dayObj.isCurrentMonth
                        ? "bg-white text-gray-900 hover:bg-[#663a7e]/10 cursor-pointer border border-gray-200"
                        : "bg-white text-gray-300 cursor-not-allowed border border-gray-200"
                    }
                    disabled:hover:bg-white
                  `}
                >
                  {dayObj.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;