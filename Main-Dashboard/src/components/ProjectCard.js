import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-emerald-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">{project.category}</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
        </div>
        <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {project.status}
        </span>
      </div>
      <p className="mt-4 text-slate-600 dark:text-slate-300">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          Live Demo
        </a>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          GitHub Source
        </a>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
