import { Box, FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { nanoid } from "nanoid";
import { SelectorDropdown } from "./SelectorDropdown";
import InputType from "./InputType";
import DeleteButton from "./Button/DeleteButton.jsx";
import { ButtonType } from "./Button/ButtonType.jsx";
import { HiXMark } from "react-icons/hi2";

export default function CancellationRules() {
  const [rules, setRules] = useState([
    { id: nanoid(), condition: "less", hours: "2", deduction: "100" },
  ]);

  const handleChange = (index, field, value) => {
    setRules((prev) =>
      prev.map((rule, i) => (i === index ? { ...rule, [field]: value } : rule)),
    );
  };

  const handleDelete = (index) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };

  const addRule = () => {
    setRules((prev) => [
      ...prev,
      { id: nanoid(), condition: "less", hours: "", deduction: "" },
    ]);
  };

  return (
    <>
      <section className="mt-1 border rounded p-4 border-gray-200 p-5">
        {/* HEADERS */}
        <Box className="grid grid-cols-2 gap-8 mb-3">
          <FormLabel className="formLabels" required>
            Select Time Of Cancellation
          </FormLabel>

          <FormLabel className="formLabels" required>
            Deduction For Cancellation
          </FormLabel>
        </Box>
        <Box>
          {" "}
          {/* RULE ROWS */}
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            {rules.map((rule, index) => (
              <Box
                key={rule.id}
                display="grid"
                gridTemplateColumns="1fr 1fr "
                columnGap={4}
                alignItems="center"
              >
                {/* LEFT SIDE */}
                <Box display="grid" gridTemplateColumns="0.5fr 1.5fr" gap={4}>
                  <Box display="flex" alignItems="center">
                    <SelectorDropdown
                      value={rule.condition}
                      onChange={(val) => handleChange(index, "condition", val)}
                      options={[
                        { label: "Less Than", value: "less" },
                        { label: "More Than", value: "more" },
                      ]}
                      placeholder="Select Rule"
                    />
                  </Box>
                  <Box display="flex" alignItems="center">
                    <InputType
                      type="number"
                      min={0}
                      placeholder="Enter Hours"
                      value={rule.hours}
                      onChange={(e) =>
                        handleChange(index, "hours", e.target.value)
                      }
                      endIcon={"hr"}
                    />
                  </Box>
                </Box>{" "}
                {/* RIGHT SIDE */}
                <Box display="flex" alignItems="center" gap={2}>
                  <InputType
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Enter %"
                    value={rule.deduction}
                    onChange={(e) =>
                      handleChange(index, "deduction", e.target.value)
                    }
                    endIcon={"%"}
                  />
                  {rules.length > 1 && (
                    <DeleteButton onClick={() => handleDelete(index)}>
                      <HiXMark size={26} />
                    </DeleteButton>
                  )}
                </Box>
              </Box>
            ))}
          </FormControl>
        </Box>{" "}
        {/* ADD RULE BUTTON */}
      </section>
      <Box mt={2}>
        <ButtonType
          type="button"
          variant="outline"
          onClick={addRule}
          className="w-fit"
          leftIcon={<HiPlus />}
        >
          Add More Rule
        </ButtonType>
      </Box>
    </>
  );
}
