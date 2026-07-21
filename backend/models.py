from sqlmodel import SQLModel, Field
from typing import Optional


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    done: bool = False
    priority: int = 1


class TaskCreate(SQLModel):
    title: str
    priority: int = 1


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    done: Optional[bool] = None
    priority: Optional[int] = None