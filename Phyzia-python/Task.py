from tkinter import *
from tkinter import messagebox
import random
import time
import threading
import msvcrt as m

class Application:
    
    def __init__(self, Parent):
        self._drag_data = {"x": 0, "y": 0, "item": None}
        self.buffer = []
        self.buf_index = 0
        self.ids = [0]
        self.shapes = {}
        self.counter = 0
        self.pressed = False
        self.currentShape = None
        self.x = 0
        self.y = 0
        self.flowStarted = False
        list = self.createLayout(Parent)
        self.createShapes(list[1])
        self.flow = {}
        self.blocks =  {
                'Task': self.task,
                'Input': self.input,
                'End': self.end
            }

    def createLayout(self, Parent):
        
        self.leftFrame = Frame(Parent, bg="white") 
        self.leftFrame.pack(side=LEFT, fill = "both")
        self.rightFrame = Frame(Parent, bg="blue") 
        self.rightFrame.pack(side="bottom")
        self.canvas = Canvas(Parent)
        self.canvas.pack(fill = "both", expand = True)
        self.StartProcess = Button(self.rightFrame, text = "Start Flow", command =  self.startFlow)
        self.CleanProcess = Button(self.rightFrame, text = "Clean Flow", command = self.clear)
        self.StartProcess.grid(row = 0)
        self.CleanProcess.grid(row = 0, column= 1)
        self.canvas.tag_bind("token", "<Button-1>", self.shapes_pressed)
        self.canvas.tag_bind("token", "<B1-Motion>", self.shapes_moved)
        self.canvas.tag_bind("token", "<ButtonRelease-1>", self.on_shapes_release)
        self.canvas.tag_bind("token", "<B3-Motion>", self.on_shapes_draw)
        self.canvas.tag_bind("token", "<ButtonRelease-3>", self.on_shapes_draw_releas)
        #self.canvas.tag_bind("token", "<DoubleButton-1>", self.on_shapes_draw_releas)
        self.canvas.bind("<Motion>", self.motion)
        return [self.rightFrame, self.leftFrame]

    def SpecifyTask (self, event):
        print("s")

    def createShapes(self, Parent): 
        self.taskImage = PhotoImage(file = ".\Images\Task.PNG")
        self.StartImage = PhotoImage(file = ".\Images\Start.PNG")
        self.EndImage = PhotoImage(file = ".\Images\End.PNG")
        self.InputImage = PhotoImage(file = ".\Images\Intermediate.PNG")        
        self.TaskSympol = Button(Parent, width = 60, image = self.taskImage)
        self.TaskSympol.image = self.taskImage
        self.StartSympol = Button(Parent, width = 60, image = self.StartImage)
        self.StartSympol.image = self.StartImage  
        self.EndSympol = Button(Parent, width = 60, image = self.EndImage)
        self.EndSympol.image = self.EndImage
        self.InputeSympol = Button(Parent, width = 60, image = self.InputImage)
        self.InputeSympol.image = self.InputImage      
        self.TaskSympol.grid(row=0, padx = 5, pady = 5)
        self.StartSympol.grid(row=1,padx = 5, pady = 5)
        self.EndSympol.grid(row=2,padx = 5, pady = 5)
        self.InputeSympol.grid(row=3,padx = 5, pady = 5)

        self.TaskSympol.bind("<ButtonRelease-1>", lambda event, image = self.taskImage, tag = "Task"
        : self.buttons_pressed(image, event, tag))    
        self.StartSympol.bind("<ButtonRelease-1>", lambda event, image = self.StartImage,  tag = "Start"
        : self.buttons_pressed(image, event, tag))    
        self.EndSympol.bind("<ButtonRelease-1>", lambda event, image = self.EndImage, tag = "End"
        : self.buttons_pressed(image, event, tag))
        self.InputeSympol.bind("<ButtonRelease-1>", lambda event, image = self.InputImage, tag = "Input"
        : self.buttons_pressed(image, event, tag))
        
    def buttons_pressed(self, image , event, tag):
        if (tag == "Start" or tag == "End") and tag in self.shapes.values():
            return    
        shape = self.canvas.create_image(event.x, event.y, image = image, tags= ("token", tag))
        self.shapes[shape] = tag
      

    def shapes_pressed(self, event):
        self._drag_data['item'] = self.canvas.find_closest(event.x, event.y)[0]
        self._drag_data['x'] = event.x
        self._drag_data['y'] = event.y

    def shapes_moved(self, event):
        #print("iam there")        
        offset_x = event.x - self._drag_data["x"]
        offset_y = event.y - self._drag_data["y"]
        self.canvas.move(self._drag_data['item'], offset_x, offset_y)

        if self._drag_data['item'] in self.flow.keys() :            
            line = self.flow[self._drag_data['item']][1]
            self.canvas.delete(line)
            forward = self.flow[self._drag_data['item']][0]
            cor = self.canvas.coords(forward)
            cor_cur =  self.canvas.coords(self._drag_data['item'])
            token = self.shapes[self._drag_data['item']]
            self.currentLine =  token + str(self.id)
            self.canvas.delete(self.currentLine)
            line = self.canvas.create_line(cor_cur[0], cor_cur[1], cor[0], cor[1], arrow = LAST, tags = self.currentLine)
            if self.flowStarted:
                self.canvas.itemconfig(line, width = 3, fill = 'green')

        self._drag_data["x"] = event.x
        self._drag_data["y"] = event.y
   
    def on_shapes_release(self, event):
        '''End drag of an object'''
        if self._drag_data['item'] in self.flow.keys() :  
            line = self.canvas.find_withtag(self.currentLine)
            self.flow[self._drag_data['item']][1] = line
        self._drag_data["item"] = None
        self._drag_data["x"] = 0
        self._drag_data["y"] = 0


    def on_shapes_draw(self, event):
        if self.pressed == False:
            self.pressed = True
            self.currentShape = self.canvas.find_closest(event.x, event.y)[0]
            z = self.canvas.coords(self.currentShape)
            self.x =z[0]
            self.y = z[1]
            self.id = self.generateId()

        #if self.shapes[self.currentShape] != "End" :
        token = self.shapes[self.currentShape]
        self.currentLine =  token + str(self.id)
        self.canvas.delete(self.currentLine)
        self.canvas.create_line(self.x, self.y, self.mouse_x, self.mouse_y, arrow = LAST, tags = self.currentLine) 
    


    def motion(self, event):
        self.mouse_x = event.x
        self.mouse_y = event.y
            
    
    def on_shapes_draw_releas(self, event):
        self.pressed = False
        forward  = self.canvas.find_closest(event.x, event.y)[0]
        if (forward in self.shapes.keys() and self.shapes[self.currentShape] != "End" 
        and self.shapes[forward]!= "Start" and not self.currentShape in self.flow.keys()):
            cor = self.canvas.coords(forward)
            self.canvas.delete(self.currentLine)
            line = self.canvas.create_line(self.x, self.y, cor[0], cor[1], arrow = LAST, tags = self.currentLine) 
            self.flow[self.currentShape] = [forward, line] 
        else:
            self.canvas.delete(self.currentLine)


    def generateId(self):
        while True:
            x = random.randint(1, 101)
            if x not in self.ids :
                self.ids.append(x)
                return x
    
    def clear(self):
        self.flow.clear()
        self.shapes.clear()
        self.canvas.delete("all")

    def startFlow(self):
        self.flowStarted = True
        start = self.canvas.find_withtag('Start')
        end = self.canvas.find_withtag('End')
        if (len(start)  or len(end)) <= 0 or start[0] not in self.flow.keys():
            messagebox.showwarning('Wrong Design', 'There is No Start Or End Event')
            return
        curBlock  = start[0]
        while True:
            #self.canvas.itemconfig(start, color = 'green')
            if curBlock in self.flow.keys():
                nextBlock = self.flow[curBlock][0]
                nextLine = self.flow[curBlock][1]
                self.canvas.itemconfig(nextLine, width = 3, fill = 'green')
                tag = self.shapes[nextBlock]
                func = self.blocks[tag]
                curBlock = nextBlock
                func()
                print('here')
            elif self.shapes[curBlock] == 'End':
               return
            
            else:
                messagebox.showwarning('Wrong Design', 'Flow is not connected properly')
                return
    def end(self):
        messagebox.showinfo('adawaw', 'successfuly run')

    def task(self):
        txt = "value:"
        self.buf_index = 0
        if len(self.buffer) > 0: 
            for i in self.buffer:
                txt = txt + str(i) + " "
        messagebox.showinfo('info', txt)
        
        print(txt)
    
    def input(self):     
        self.show = Toplevel()
        self.entered = False
        self.lb = Label(self.show, text = 'Enter your input', bd = 5)
        self.lb.grid(row= 0, column = 3)
        self.tx = Entry(self.show, bd = 5)
        self.tx.grid(row= 0, column = 4)
        self.button = Button(self.show, text = "OK", bd = 5, command = self.close_window)
        self.button.grid(row = 0, column = 5)
        
        self.show.mainloop()
    def close_window(self):
        self.txt = self.tx.get()
        self.entered = True
        self.buffer.append(self.txt)
        self.buf_index += 1
        self.show.quit()
        self.show.destroy()
   
     
root = Tk()    
Application(root)
root.mainloop()