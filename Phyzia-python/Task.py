from tkinter import *
from tkinter import messagebox
import random
import time
import threading
import asyncio


class Application:
    
    def __init__(self, Parent, loop):
        self.parent = Parent
        self.flowBegin = False
        self.loop = loop
        self.GatewayDict = {}
        self.waitForInput = False
        self._drag_data = {"x": 0, "y": 0, "item": None}
        self.buffer = 'Hello'
        self.buf_index = 0
        self.ids = [0]
        self.shapes = {}
        self.pressed = False
        self.clear_ = False
        self.currentShape = None
        self.x = 0
        self.y = 0
        self.inputs = {}
        self.flowStarted = False
        list = self.createLayout(Parent)
        self.createShapes(list[1])
        self.continueFlow = False
        self.flow = {}
        self.blocks =  {
                'Task': self.task,
                'Input': self.input,
                'End': self.end,
                'Gateway' : self.Gateway,
                'Start' : self.Start
            }
    def Gateway(self):
        return
    def Start(self):
        return

    def createLayout(self, Parent):
        Parent.bind("<Key>", self.close_window)
        self.leftFrame = Frame(Parent, bg="white") 
        self.leftFrame.pack(side=LEFT, fill = "both")
        self.rightFrame = Frame(Parent, bg="blue") 
        self.rightFrame.pack(side="bottom")
        self.canvas = Canvas(Parent)
        self.canvas.pack(fill = "both", expand = True)
        self.canvas.tag_bind("token", "<Button-1>", self.shapes_pressed)
        self.canvas.tag_bind("token", "<B1-Motion>", self.shapes_moved)
        self.canvas.tag_bind("token", "<ButtonRelease-1>", self.on_shapes_release)
        self.canvas.tag_bind("token", "<B3-Motion>", self.on_shapes_draw)
        self.canvas.tag_bind("token", "<ButtonRelease-3>", self.on_shapes_draw_releas)
        self.canvas.bind("<Motion>", self.motion)
        return [self.rightFrame, self.leftFrame]

    # 

    def input_wait_break(self, event):
        if(self.waitForInput):
            self.waitForInput = False

    def createShapes(self, Parent): 
        self.taskImage = PhotoImage(file = ".\Images\Task.PNG")
        self.StartImage = PhotoImage(file = ".\Images\Start.PNG")
        self.EndImage = PhotoImage(file = ".\Images\End.PNG")
        self.InputImage = PhotoImage(file = ".\Images\Intermediate.PNG")
        self.GatewayImage = PhotoImage(file = ".\Images\Gateway.PNG")       
        self.TaskSympol = Button(Parent, image = self.taskImage)
        self.TaskSympol.image = self.taskImage
        self.StartSympol = Button(Parent, image = self.StartImage)
        self.StartSympol.image = self.StartImage  
        self.EndSympol = Button(Parent, image = self.EndImage)
        self.EndSympol.image = self.EndImage
        self.InputeSympol = Button(Parent, image = self.InputImage)
        self.InputeSympol.image = self.InputImage
        self.GatewaySympol = Button(Parent, image = self.GatewayImage)
        self.GatewaySympol.image = self.GatewayImage 
        self.StartProcess = Button(self.rightFrame, text = "Start Flow", command = self.start)
        self.CleanProcess = Button(self.rightFrame, text = "Clean Flow", command = self.clear)      
        self.TaskSympol.grid(row=0, padx = 5, pady = 5)
        self.InputeSympol.grid(row=3,padx = 5, pady = 5)
        self.GatewaySympol.grid(row=4,padx = 5, pady = 5)
        self.StartSympol.grid(row=1,padx = 5, pady = 5)
        self.EndSympol.grid(row=2,padx = 5, pady = 5)
        self.StartProcess.pack(side = LEFT)
        self.CleanProcess.pack()      
        self.TaskSympol.bind("<ButtonRelease-1>", lambda event, image = self.taskImage, tag = "Task"
        : self.buttons_pressed(image, event, tag))    
        self.StartSympol.bind("<ButtonRelease-1>", lambda event, image = self.StartImage,  tag = "Start"
        : self.buttons_pressed(image, event, tag))    
        self.EndSympol.bind("<ButtonRelease-1>", lambda event, image = self.EndImage, tag = "End"
        : self.buttons_pressed(image, event, tag))
        self.InputeSympol.bind("<ButtonRelease-1>", lambda event, image = self.InputImage, tag = "Input"
        : self.buttons_pressed(image, event, tag))  
        self.GatewaySympol.bind("<ButtonRelease-1>", lambda event, image = self.GatewayImage, tag = "Gateway"
        : self.buttons_pressed(image, event, tag))
        
    def buttons_pressed(self, image , event, tag):
        if (tag == "Start") and tag in self.shapes.values():
            return    
        shape = self.canvas.create_image(event.x, event.y, image = image, tags= ("token", tag))
        self.shapes[shape] = tag
        if(tag == 'Input'):
            self.waitInput()
            self.inputs[shape] = [self.cur_Key, False]
            self.parent.bind(self.cur_Key, self.set_input)
        
        
    def set_input(self, event):
        for el in self.inputs.keys():
            
            if(self.inputs[el][0] == str(event.char)):
                self.inputs[el][1] = True

    def waitInput(self):
        self.waitForInput = True     
        self.show = Toplevel()       
        #self.show.withdraw()
        self.lb = Label(self.show, text = 'Enter your input', bd = 5)
        self.lb.grid(row= 0, column = 3) 
        self.show.mainloop()
    
    def close_window(self, event):
        if(self.waitForInput):
            self.cur_Key = event.char
            self.cur_Key = str(self.cur_Key)
            print(self.cur_Key)
            self.waitForInput = False    
            #print(event.char)
            self.show.quit()
            self.show.destroy()
      

    def shapes_pressed(self, event):
        self._drag_data['item'] = self.canvas.find_closest(event.x, event.y)[0]
        self._drag_data['x'] = event.x
        self._drag_data['y'] = event.y

    def shapes_moved(self, event):       
        offset_x = event.x - self._drag_data["x"]
        offset_y = event.y - self._drag_data["y"]
        self.canvas.move(self._drag_data['item'], offset_x, offset_y)
        if self._drag_data['item'] in self.flow.keys() : 
            for  el in self.flow[self._drag_data['item']]:          
                line = el[1]
                self.canvas.delete(line)
                forward = el[0]
                cor = self.canvas.coords(forward)
                cor_cur =  self.canvas.coords(self._drag_data['item'])
                token = self.shapes[self._drag_data['item']]
                self.currentLine =  token + str(self.id)
                self.canvas.delete(self.currentLine)
                line = self.canvas.create_line(cor_cur[0], cor_cur[1], cor[0], 
                cor[1], arrow = LAST, tags = self.currentLine)
                el[1] = line
                if self.flowStarted:
                    self.canvas.itemconfig(line, width = 3, fill = 'green')

        self._drag_data["x"] = event.x
        self._drag_data["y"] = event.y
   
    def on_shapes_release(self, event):
        '''End drag of an object'''
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

        token = self.shapes[self.currentShape]
        self.currentLine =  token + str(self.id)
        self.canvas.delete(self.currentLine)
        self.canvas.create_line(self.x, self.y, self.mouse_x, self.mouse_y, arrow = LAST, tags = self.currentLine) 
    


    def motion(self, event):
        self.mouse_x = event.x
        self.mouse_y = event.y
            
    
    def on_shapes_draw_releas(self, event):
        self.pressed = False
        if(len(self.canvas.find_overlapping(event.x, event.y, event.x, event.y)) > 0):
            forward  = self.canvas.find_overlapping(event.x, event.y, event.x, event.y)[0]
            if (forward in self.shapes.keys() 
            and self.shapes[self.currentShape] != "End" 
            and self.shapes[forward]!= "Start" 
            and (not self.currentShape in self.flow.keys() 
            or self.shapes[self.currentShape] == "Gateway")):
                cor = self.canvas.coords(forward)
                self.canvas.delete(self.currentLine)
                line = self.canvas.create_line(self.x, self.y, cor[0], cor[1], arrow = LAST, tags = self.currentLine)
                list1 = [forward, line]
                if(self.currentShape not in self.flow.keys()):
                    self.flow[self.currentShape] = []
                if forward not in self.GatewayDict.keys():
                    self.GatewayDict[forward] = 0               
                self.flow[self.currentShape].append(list1)                
                if self.shapes[forward] == "Gateway":
                    self.GatewayDict[forward] += 1
            else:
                 self.canvas.delete(self.currentLine)        
                
        else:
            self.canvas.delete(self.currentLine)


    def generateId(self):
        while True:
            x = random.randint(1, 101)
            if x not in self.ids :
                self.ids.append(x)
                return x
    
    def clear(self):
        self.flowStarted = False
        self.flow.clear()
        self.shapes.clear()
        self.canvas.delete("all")
        self.flowStarted = False
        self.continueFlow = False
        self.flowBegin = False
        self.GatewayDict.clear()
        self.inputs.clear()
        if(self.clear_):
            self.loop.create_task(self.startFlow(0))
            self.clear_ = False
    
   
        
    def end(self):
        messagebox.showinfo('Result', 'successfuly run')

    def task(self):
        txt = self.buffer
        messagebox.showinfo('info', txt)
        
    def acceptInput(self):
        acc_win = Toplevel()
        lb = Label(acc_win, text = 'press a key')
        lb.pack()
        acc_win.mainloop()

    async def input(self, curInput):
        while True:
            if(not self.inputs[curInput][1]):
                await asyncio.sleep(0.1)
                continue
            else:
                self.inputs[curInput][1] = True
                return       

    def start(self):
        self.flowBegin = True
        
        
    async def startFlow(self, start):
        while True:
            if not self.flowBegin:
                await asyncio.sleep(0.01)
                continue
            self.flowStarted = True
            if start == 0:
                start = self.canvas.find_withtag('Start')[0]
            curBlock  = start
            print(self.shapes[curBlock])
            while True:
                if curBlock in self.flow.keys():
                    nextBlock = self.flow[curBlock][0][0]
                    nextLine = self.flow[curBlock][0][1]
                    tag = self.shapes[curBlock]
                    func = self.blocks[tag]
                    if self.shapes[curBlock] == 'Gateway':
                        if(self.GatewayDict[curBlock] > 0):
                            self.GatewayDict[curBlock] -= 1
                        if self.GatewayDict[curBlock] <= 0:
                            for el in self.flow[curBlock] :
                                self.canvas.itemconfig(el[1], width = 3, fill = 'green') 
                            self.GatewayFlow(curBlock)
                        return  
                    else:
                        if(tag == 'Input'):
                            fun = self.loop.create_task(func(curBlock))
                            await asyncio.wait([fun])
                        else:
                             func()
                        curBlock = nextBlock
                        self.canvas.itemconfig(nextLine, width = 3, fill = 'green')
                    
                elif self.shapes[curBlock] == 'End':
                    self.clear_ = True
                    self.end()
                    return 
                        
                else:
                    messagebox.showwarning('Wrong Design', 'Flow is not connected properly')
                    self.continueFlow = False
                    self.clear_ = True
                    return 

    def GatewayFlow(self, curGateway):
        if len(self.flow[curGateway]) > 0:
            for el in self.flow[curGateway]:
                asyncio.ensure_future(self.startFlow(el[0]))

    
async def run_tk(root, interval = 0.009): 
    try: 
        while True:
            root.update()
            await asyncio.sleep(interval)
    except Exception as e:
            pass
    finally:
            pass
    

   
async def main():
    root = Tk()
    app = Application(root, loop)
    fun0 = loop.create_task(run_tk(root))
    loop.create_task(app.startFlow(0))
    #loop.create_task(app.GatewayFlow())
    await asyncio.wait([fun0])

    pass
if __name__ == "__main__":
    loop = asyncio.get_event_loop()
try:

    loop.run_until_complete(main())
   
finally:
    loop.close()





