import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ExternalLink, ChevronDown } from "lucide-react";

export interface Job {
  id: string;
  position: string;
  companyName: string;
  appliedDate: string;
  jobUrl: string;
  location: string; // Added location field
}

interface AppliedJobsProps {
  jobs: Job[];
}

function AppliedJobs({ jobs }: AppliedJobsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-5 rounded-lg bg-zinc-800/35 border border-zinc-700/50 shadow-lg">
      <div
        className="flex items-center gap-3 mb-4 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-400/20">
          <Briefcase className="w-5 h-5 text-indigo-300" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-100">Applied Jobs</h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            {jobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-center rounded-lg bg-zinc-700/20 border border-dashed border-zinc-600/50"
              >
                <p className="text-sm text-zinc-400">
                  No applications yet. Start applying to see them here!
                </p>
              </motion.div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-zinc-700/20 hover:bg-zinc-700/30 transition-colors border border-zinc-700/50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <h3 className="text-base font-semibold text-zinc-100">
                            {job.position}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-indigo-300">
                              {job.companyName}
                            </span>
                            <span className="text-zinc-500">•</span>
                            <span className="text-xs font-medium text-zinc-400">
                              {job.location}
                            </span>
                            <span className="text-zinc-500">•</span>
                            <span className="text-xs font-medium text-zinc-400">
                              Applied on {job.appliedDate}
                            </span>
                          </div>
                        </div>
                        <motion.a
                          href={job.jobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                          whileHover={{ x: 2 }}
                        >
                          View
                          <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AppliedJobs;
