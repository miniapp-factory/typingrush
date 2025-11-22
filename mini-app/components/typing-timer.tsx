"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TypingTimer() {
  const [word, setWord] = useState("hello");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "fail">("idle");

  useEffect(() => {
    if (status !== "running") return;
    if (timeLeft <= 0) {
      setStatus("fail");
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  const startGame = () => {
    setWord(Math.random().toString(36).substring(2, 7));
    setInput("");
    setTimeLeft(10);
    setStatus("running");
  };

  const submit = () => {
    if (status !== "running") return;
    if (input.trim() === word) {
      setStatus("success");
    } else {
      setStatus("fail");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">Typing Timer</h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <p className="text-2xl font-mono">{word}</p>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== "running"}
          className="w-full"
        />
        <p className="text-lg">
          Time left: <span className={cn({ "text-red-600": timeLeft <= 3 })}>{timeLeft}s</span>
        </p>
        {status === "success" && <p className="text-green-600">Success!</p>}
        {status === "fail" && <p className="text-red-600">Failed!</p>}
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {status === "idle" && (
          <Button onClick={startGame} variant="primary">
            Start
          </Button>
        )}
        {status === "running" && (
          <Button onClick={submit} variant="primary">
            Submit
          </Button>
        )}
        {(status === "success" || status === "fail") && (
          <Button onClick={startGame} variant="outline">
            Play Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
