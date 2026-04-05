import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import projectsData from './data/projects';

const categories = ['All', 'UI', 'API', 'Full Stack'];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesSearch = [project.name, project.description, project.tech.join(' ')].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
        <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((prev) => !prev)} />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Hero />

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/20 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Explore projects</h2>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Search and filter to find the perfect demo from the collection.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:w-2/3 lg:grid-cols-[1fr_auto]">
                <input
                  type="search"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-emerald-400"
                />

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        activeCategory === category
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                          : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-10"
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
              ) : (
                <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-12 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <h3 className="text-xl font-semibold">No projects found</h3>
                  <p className="mt-3">Try adjusting your search or selecting a different category.</p>
                </div>
              )}
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
