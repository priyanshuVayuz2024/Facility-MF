import React, { useEffect, useState } from "react";
import { CircularProgress, Stepper, Step, StepButton, Box, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb.jsx";
import { FormWrapper } from "../../components/ui/wrapper/form.jsx";
import { basePath } from "../../utils/index.jsx";
import { useDispatch } from "react-redux";
import { resetBookingForm } from "../../redux/slice/bookingCreateSlice.js";

const steps = [
    { label: "Booking Details", path: "details" },
    { label: "Schedule & Confirmation", path: "confirmation" },
];

export default function BookingCreateLayout() {
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
        navigate(`/create-booking/${steps[stepIdx].path}`);
    };

    const handleStepClick = (idx) => {
        if (completed.includes(idx) || idx <= activeStep) {

            // reset completion of future steps if moving backwards
            if (idx < activeStep) {
                setCompleted(prev => prev.filter(step => step <= idx));
            }

            goToStep(idx);
        }
    };



    useEffect(() => {
        if (!steps?.some(s => location.pathname.includes(s?.path))) {
            navigate(`${basePath}/create-booking/details`)
        }
        setCompleted([]);
        dispatch(resetBookingForm())
    }, [])
    useEffect(() => {
        if (activeStep > 0 && !completed.includes(activeStep - 1)) {
            navigate("/create-booking/details");
        }
    }, [activeStep, completed]);



    return (
        <Box>
            <MetaTitle title={isPreviewPage ? "Preview Booking" : "Add Booking"} />

            {/* Breadcrumb and Page Title */}
            <BreadCrumbCustom
                fixed={true}
                links={[{ label: "Booking List", to: `${basePath}/` }]}
                pageTitle={isPreviewPage ? "Preview Booking" : "Add New Booking"}
                description={!isPreviewPage && "Add a new booking for this facility"}
                backLink={isPreviewPage && `${basePath}/create-booking/confirmation`}

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
                            sx={{
                                width: "fit-content",
                                paddingX: "4px",
                                paddingTop: "16px",
                                paddingBottom: "32px",
                                "& .MuiStep-root": {
                                    paddingLeft: "12px",
                                    paddingRight: "12px",
                                },
                                "& .MuiStepIcon-root": {
                                    color: "#EBEBEB",
                                    "&.Mui-completed": {
                                        color: "#4caf50",
                                    },
                                    "&.Mui-active": {
                                        // backgroundColor: "#FBF5FF",
                                        color: "#FBF5FF",
                                        border: "1px solid #884EA7",
                                        borderRadius: "50%",
                                    },
                                },
                                "& .MuiStepLabel-label": {
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#ADADAD",
                                    "&.Mui-active": {
                                        color: "#884EA7",
                                        fontWeight: "600",
                                    },
                                    "&.Mui-completed": {
                                        color: "#121212",
                                        fontWeight: "500",
                                    },
                                },
                                "& .MuiStepLabel-iconContainer": {
                                    paddingRight: "12px",
                                },
                                "& .MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
                                    color: "#884EA7",
                                    fill: "#884EA7",
                                    fontWeight: 500,
                                },
                                "& .MuiStepIcon-root.Mui-active.Mui-completed": {
                                    color: "#4caf50 !important",
                                    border: "none !important",
                                    fontWeight: 500,
                                },

                                "& .MuiStepIcon-text": {
                                    // color: "#884EA7",
                                    fill: "#ADADAD",
                                },
                                "& .MuiStepConnector-lineHorizontal": {
                                    width: "4px",

                                    [theme.breakpoints.up("sm")]: {
                                        width: "90px",
                                    },

                                    [theme.breakpoints.up("md")]: {
                                        width: "121px",
                                    },
                                },
                            }}
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
