import { cn } from '@/lib/utils'
import { AgentProps } from '@/types'
import Image from 'next/image'
import React from 'react'


enum CALLSTATUS {
  INACTIVE="INACTIVE",
  CONNECTING="CONNECTING",
  ACTIVE="ACTIVE",
  FINISHED="FINISHED",
}


const Agent = ({userName,userId,type}:AgentProps) => {
  const isSpeaking = true
  const callStatus = CALLSTATUS.FINISHED;
  const messages = [
    "What's your name?",
    "My name is John Doe",
    "What's your age?",
    "I'm 25 years old",
    "What's your email?",
    "My email is john.doe@example.com",
    "What's your phone number?",
  ]

  const latestMessage = messages[messages.length - 1];
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src={"/ai-avatar.png"}
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>

          <h3>AI interviewer</h3>
        </div>

        <div className={"card-border"}>
          <div className="card-content">
            <Image
              src={"/user-avatar.png"}
              alt="user avatar"
              width={540}
              height={540}
              className="object-cover rounded-full size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {/* Transcript */}
      {messages?.length > 0 && (
        <div className='transcript-border'>
          <div className='transcript'>
            <p key={latestMessage} className={cn("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100")}>
              {latestMessage}
            </p>
          </div>
        </div>
)}

      {/* Call status buttons */}
      <div className="w-full flex justify-center">
        {callStatus !== CALLSTATUS.ACTIVE ? (
          <button className="btn-call relative">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CALLSTATUS.CONNECTING && "hidden"
              )}
            />

            <span>
              {callStatus === CALLSTATUS.INACTIVE || CALLSTATUS.FINISHED
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>
    </>
  );
}

export default Agent