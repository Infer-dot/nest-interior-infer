'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { create_file, delete_file, IProjects } from "@/lib/appwrite";
import db from "@/lib/database";
import { ResetIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type Status = 'idle' | 'loading' | 'saving' | 'uploading' | 'deleting' | 'imgloadin';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<IProjects[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProjects | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newProject, setNewProject] = useState<IProjects>({
    project_name: "",
    description: "",
    image_url: "",
    file_id: ""
  });
  const [status, setStatus] = useState<Status>('idle');

  // Fetch projects initially
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setStatus('loading');
    try {
      const allProjects = await db.projects.list();
      setProjects(allProjects.documents);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setStatus('idle');
    }
  };

  const addNewProject = () => {
    setIsCreatingNew(true);
    setSelectedProject(null);
    setNewProject({ project_name: "", description: "", image_url: "", file_id: "" });
  };

  const handleUpload = async (file: File) => {
    setStatus('uploading');
    try {
      const { filePath, file_ID } = await create_file(file);
      setNewProject((prev) => ({ ...prev, image_url: filePath, file_id: file_ID }));
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setStatus('idle');
    }
  };

  const deleteUpload = async (file_id: string) => {
    setStatus('deleting');
    try {
      const result = await delete_file(file_id);
      if (result) {
        setNewProject((prev) => ({ ...prev, image_url: "", file_id: "" }));
      }
    } catch (error) {
      console.error("Error deleting upload:", error);
    } finally {
      setStatus('idle');
    }
  };

  const selectProject = async (projectId: string) => {
    setStatus('loading');
    setIsCreatingNew(false);
    try {
      const project = await db.projects.get(projectId);
      setSelectedProject(project);
      setStatus('imgloadin')
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setTimeout(() => {
        setStatus('idle');
      }, 500);
    }
  };

  const deleteProject = async (projectId: string) => {
    setStatus('deleting');
    try {
      const project = await db.projects.get(projectId);
      await delete_file(project.file_id);
      await db.projects.remove(projectId);
      await fetchProjects();
      setSelectedProject(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setStatus('idle');
    }
  };

  const saveChanges = async () => {
    setStatus('saving');
    try {
      const payload = {
        project_name: newProject.project_name,
        description: newProject.description,
        image_url: newProject.image_url,
        file_id: newProject.file_id
      };

      const createdProject = await db.projects.create(payload);

      if (createdProject.$id) {
        await selectProject(createdProject.$id);
      } else {
        await fetchProjects();
      }
      setIsCreatingNew(false);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setStatus('idle');
    }
  };

  const isBusy = status !== 'idle';

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 border-r flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Projects</h2>
        </div>
        <div className="px-4 pb-2">
          <Button
            size="sm"
            className="w-full font-semibold"
            onClick={addNewProject}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <div className="w-full flex flex-col p-2">
            {projects.map((project) => (
              <Button
                key={project.$id}
                className={cn(
                  "w-full my-1 py-4 justify-start font-semibold",
                  selectedProject?.$id === project.$id
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-background hover:bg-accent hover:text-accent-foreground"
                )}
                variant={selectedProject?.$id === project.$id ? "ghost" : "outline"}
                onClick={() => selectProject(project.$id || "")}
              >
                {project.project_name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ">
        {isCreatingNew && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveChanges();
            }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold">Create New Project</h2>
            <Input
              placeholder="Project Name"
              value={newProject.project_name}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, project_name: e.target.value }))
              }
              required
              className="text-lg p-4"
            />
            <Textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, description: e.target.value }))
              }
              required
              className="min-h-[150px] text-lg p-4"
            />
            <div className="space-y-4">
              <label className="block text-lg font-semibold">Project Image</label>
              {newProject.image_url ? (
                <div className="space-y-4">
                  <Image
                    src={newProject.image_url}
                    alt="Uploaded Image"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-[300px]"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => deleteUpload(newProject.file_id || "")}
                    className="w-full"
                  >
                    <ResetIcon className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-[300px]">
                  <Input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) =>
                      e.target.files?.[0] && handleUpload(e.target.files[0])
                    }
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 py-2"
                  >
                    <Upload className="w-6 h-6 mr-2" />
                    Upload Image
                  </label>
                  {status === 'uploading' && <Loader2 className="h-6 w-6 animate-spin ml-2" />}
                </div>
              )}
            </div>
            <Button type="submit" disabled={isBusy} className="w-full text-lg py-6">
              {status === 'saving' ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        )}

        {!isCreatingNew && selectedProject && (
          <div className="max-w-3xl mx-auto space-y-6">
            {status === 'loading' ? (
              <div className="flex justify-center items-center h-[400px]">
                <Loader2 className="h-18 w-18 animate-spin" />
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold">{selectedProject.project_name}</h2>
                <p className="text-lg">{selectedProject.description}</p>
                {selectedProject.image_url && (
                  <div className="relative">
                    {status === 'imgloadin' ? (
                      <div className="flex justify-center items-center h-[400px]">
                        <Loader2 className="h-18 w-18 animate-spin" />
                      </div>
                    ) : (

                      <Image
                        src={selectedProject.image_url}
                        alt="Project Image"
                        width={800}
                        height={600}
                        className="rounded-lg object-cover w-full h-[400px]"
                      />
                    )}
                  </div>
                )}
                <Button
                  variant="destructive"
                  onClick={() => deleteProject(selectedProject.$id || "")}
                  className="w-full text-lg py-6"
                >
                  <Trash2 className="w-6 h-6 mr-2" />
                  Delete Project
                </Button>
              </>
            )}
          </div>
        )}

        {!isCreatingNew && !selectedProject && (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-muted-foreground">
              Select a project to view details or create a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
