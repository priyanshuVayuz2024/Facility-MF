import React, { useEffect, useState } from "react";
import { CircularProgress, Stepper, Step, StepButton, Box, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb.jsx";
import { FormWrapper } from "../../components/ui/wrapper/form.jsx";
import { basePath, stepperCSS } from "../../utils/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { resetFacilityForm } from "../../redux/slice/facilityCreateSlice.js";

const steps = [
    { label: "Basic Details", path: "basic-details" },
    { label: "Time Availability", path: "time-availability" },
    { label: "Booking Rules", path: "booking-rules" },
];

export default function CreateLayout() {
    const theme = useTheme();

    const [completed, setCompleted] = useState([]);


    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const activeStep = steps.findIndex((s) =>
        location.pathname.includes(s.path)
    );
    const isPreviewPage = location.pathname.includes("preview");


    const goToStep = (stepIdx) => {
        navigate(`${basePath}/create-facility/${steps[stepIdx].path}`);
    };

    const handleStepClick = (idx) => {
        // allow only previous or completed steps
        if (completed.includes(idx) || idx <= activeStep) {
            goToStep(idx);
        }
    };


    useEffect(() => {
        if (!steps?.some(s => location.pathname.includes(s?.path))) {
            navigate(`${basePath}/create-facility/basic-details`)
        }
        dispatch(resetFacilityForm())
    }, [])

    useEffect(() => {
        if (activeStep > 0 && !completed.includes(activeStep - 1)) {
            navigate(`${basePath}/create-facility/basic-details`);
        }
    }, [activeStep, completed]);

    return (
        <Box>
            <MetaTitle title={isPreviewPage ? "Preview Facilites" : "Add Facility"} />

            {/* Breadcrumb and Page Title */}
            <BreadCrumbCustom
                fixed={true}
                links={[{ label: "Facility List", to: "/" }]}
                pageTitle={isPreviewPage ? "Preview Facilities" : "Add New Facility"}
                description={!isPreviewPage && "Setup facility details and booking rules."}
                backLink={isPreviewPage && "/create-facility/booking-rules"}

            />

            {/* Loader */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
                    <CircularProgress />
                </div>
            ) : (
                <FormWrapper className="flex flex-col overflow-auto!">
                    {!isPreviewPage &&
                        < Stepper
                            nonLinear
                            activeStep={activeStep}
                            sx={stepperCSS(theme)}

                        >
                            {steps.map((s, index) => (
                                <Step key={s.label} completed={completed.includes(index)}>
                                    <StepButton
                                        disabled={!(completed.includes(index) || index <= activeStep)}
                                        onClick={() => handleStepClick(index)}
                                    >
                                        {s.label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>}

                    {/* Here the 3 step screens will render */}
                    <Outlet
                        context={{
                            activeStep,
                            completed,
                            setCompleted,
                            setActiveStep: (step) => goToStep(step),
                            goToStep,
                        }}
                    />
                </FormWrapper>
            )
            }
        </Box >
    );
}
