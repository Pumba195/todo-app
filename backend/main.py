from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import Optional

from database import init_db, get_session
from models import Task, TaskCreate, TaskUpdate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def read_root():
    return {"message": "Hello, my TODO API is alive!"}


@app.get("/tasks")
def get_tasks(
    search: Optional[str] = None,
    status: Optional[str] = None,
    sort: Optional[str] = None,
    session: Session = Depends(get_session),
):
    query = select(Task)

    if search:
        query = query.where(Task.title.contains(search))

    if status == "done":
        query = query.where(Task.done == True)
    elif status == "undone":
        query = query.where(Task.done == False)

    if sort == "asc":
        query = query.order_by(Task.priority.asc())
    elif sort == "desc":
        query = query.order_by(Task.priority.desc())

    return session.exec(query).all()


@app.post("/tasks")
def create_task(task: TaskCreate, session: Session = Depends(get_session)):
    new_task = Task(title=task.title, priority=task.priority)
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task


@app.patch("/tasks/{task_id}")
def update_task(task_id: int, update: TaskUpdate, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if update.title is not None:
        task.title = update.title
    if update.done is not None:
        task.done = update.done
    if update.priority is not None:
        task.priority = update.priority

    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"message": "Task deleted"}