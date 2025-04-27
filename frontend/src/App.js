// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Using axios
import './App.css';

const WORK_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;
const SESSIONS_BEFORE_LONG_BREAK = 4;
const BACKEND_URL = 'http://localhost:5001'; // Your backend server URL

function App() {
    const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
    const [sessionCount, setSessionCount] = useState(0); // Tracks completed work sessions
    const [totalCompleted, setTotalCompleted] = useState(0); // From backend
    const [minutes, setMinutes] = useState(WORK_MINUTES);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const intervalRef = useRef(null); // To hold the interval ID

    // --- Fetch initial stats ---
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/stats`)
            .then(response => {
                setTotalCompleted(response.data.data || 0);
            })
            .catch(error => {
                console.error("Error fetching stats:", error);
                // Handle error appropriately, maybe show a message
            });
    }, []); // Empty dependency array means run once on mount

    // --- Timer Logic ---
    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer ended
                        handleTimerEnd();
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        // Cleanup function to clear interval when component unmounts or isActive changes
        return () => clearInterval(intervalRef.current);
    }, [isActive, minutes, seconds]); // Rerun effect if these change

    // --- Timer End Handler ---
    const handleTimerEnd = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        // alert(`${mode} session finished!`); // Basic alert

        if (mode === 'work') {
            const newSessionCount = sessionCount + 1;
            setSessionCount(newSessionCount);
            // Increment count on backend
            axios.post(`${BACKEND_URL}/api/complete`)
                .then(response => {
                    setTotalCompleted(response.data.newCount); // Update state with new count from backend
                })
                .catch(error => {
                    console.error("Error updating stats:", error);
                     // Handle error - maybe retry or inform user
                });

            // Decide next mode
            if (newSessionCount % SESSIONS_BEFORE_LONG_BREAK === 0) {
                setMode('longBreak');
                setMinutes(LONG_BREAK_MINUTES);
            } else {
                setMode('shortBreak');
                setMinutes(SHORT_BREAK_MINUTES);
            }
        } else { // If break ended
            setMode('work');
            setMinutes(WORK_MINUTES);
        }
        setSeconds(0);
        // Optionally auto-start next timer: setIsActive(true);
    };

    // --- Control Handlers ---
    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setIsActive(false);
        // Reset to the *current* mode's default time
        switch (mode) {
            case 'work':
                setMinutes(WORK_MINUTES);
                break;
            case 'shortBreak':
                setMinutes(SHORT_BREAK_MINUTES);
                break;
            case 'longBreak':
                setMinutes(LONG_BREAK_MINUTES);
                break;
            default:
                setMinutes(WORK_MINUTES);
        }
        setSeconds(0);
    };

    // Function to switch modes manually (optional)
    const switchMode = (newMode) => {
         clearInterval(intervalRef.current);
         setIsActive(false);
         setMode(newMode);
         switch (newMode) {
            case 'work':
                setMinutes(WORK_MINUTES);
                break;
            case 'shortBreak':
                setMinutes(SHORT_BREAK_MINUTES);
                break;
            case 'longBreak':
                setMinutes(LONG_BREAK_MINUTES);
                break;
            default:
                setMinutes(WORK_MINUTES);
        }
        setSeconds(0);
    }


    // Format time for display
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    return (
        <div className="App">
            <h1>Pomodoro Timer</h1>

             {/* Mode Selection Buttons - Optional */}
            <div>
                <button onClick={() => switchMode('work')} disabled={isActive}>Work</button>
                <button onClick={() => switchMode('shortBreak')} disabled={isActive}>Short Break</button>
                <button onClick={() => switchMode('longBreak')} disabled={isActive}>Long Break</button>
            </div>

            <div className="timer-status">{mode.replace('Break', ' Break')}</div>
            <div className="timer-display">
                {displayMinutes}:{displaySeconds}
            </div>
            <div className="controls">
                <button onClick={toggleTimer} className={isActive ? 'button-pause' : 'button-start'}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer} className="button-reset" disabled={isActive && minutes === WORK_MINUTES && seconds === 0}>
                    Reset
                </button>
            </div>
             <div className="stats">
                Completed Pomodoros Today (Work Sessions): {sessionCount} <br/>
                Total Completed Pomodoros (All Time): {totalCompleted}
            </div>
        </div>
    );
}

export default App;
