---
title: unity基础学习
description: Unity基础学习笔记，涵盖生命周期、Transform、物理系统等核心知识
tags:
  - unity
pubDatetime: 2025-01-15T00:00:00
---

课程来源：[唐老狮](https://space.bilibili.com/79983517)

### 生命周期函数

- 所有继承MonoBehavior的脚本最终都会挂载到GameObject游戏对象上，生命周期函数就是该脚本对象依附的GameObject对象从出生到消亡整个生命周期中会通过反射自动调用的一些特殊函数。Unity记录了一个GameObject对象依附了哪些脚本会自动的得到这些对象，通过反射去执行一些固定名字的函数。

- 生命周期函数的访问修饰符一般为private和protected，因为不需要再外部自己调用生命周期函数，都是Unity自己调用的

- 生命周期函数支持继承多态

| 名称        | 触发时机                           | 用途                                                         |
| ----------- | ---------------------------------- | ------------------------------------------------------------ |
| Awake       | 脚本实例被创建时调用               | 用于游戏对象的初始化，注意 Awake 的执行早于所有脚本的 Start 函数 |
| OnEnable    | 当对象变为可用或激活状态时被调用   |                                                              |
| Start       | Update 函数第一次运行之前调用      | 用于游戏对象的初始化                                         |
| Update      | 每帧调用一次                       | 用于更新游戏场景和状态                                       |
| FixedUpdate | 每个固定物理时间间隔调用一次       | 用于物理状态的更新                                           |
| LateUpdate  | 每帧调用一次（在 Update 之后调用） | 用于更新游戏场景和状态，和相机有关的更新一般放在这里         |
| OnGUI       | 渲染和处理 OnGUI 事件              |                                                              |
| OnDisable   | 当前对象不可用或非激活状态时被调用 |                                                              |
| OnDestroy   | 当前对象被销毁时调用               |                                                              |

### MonoBehavior基类

- 1. 创建的脚本默认都继承MonoBehaviour，继承了才能够挂载在Gameobject上
  2. 继承了MonoBehavior的脚本不能new只能挂！
  3. 继承了MonoBehavior的脚本不要去写构造函数，因为不会去new它，写构造函数没有任何意义
  4. 继承了MonoBehavior的脚本可以在一个对象上挂多个（如果没有加 DisallowMultipleComponent特性）
  5. 继承MonoBehavior的类也可以再次被继承，遵循面向对象继承多态的规则

- 不继承MonoBehavior的类

  1. 不继承Mono的类不能挂载在Gameobject上
  2. 不继承Mono的类想怎么写就怎么写，如果要使用需要自己new
  3. 不继承Mono的类一般是单例模式的类（用于管理模块）或者数据结构类（用于存储数据）
  4. 不继承Mono的类不用保留默认出现的几个函数（生命周期函数）

#### 重要成员

- this可以省略

- 获取依附的GameObject`this.gameObject.name`

- 获取依附的GameObject的位置信息

  位置`this.transform.position`
  
  角度`this.transform.eulerAngles`
  
  缩放大小`this.transform.lossyScale`

- 获取脚本是否激活`this.enabled = false`

- 获取别的脚本对象依附的gameobject和 transform位置信息
- 
  `otherLesson3.gameObject.name`
  
  `otherLesson3.transform.position`

#### 重要方法

#####  得到依附对象上挂载的其它脚本

```
  //1.得到自己挂载的单个脚本
  //根据脚本名获取
  //获取脚本的方法 如果获取失败 就是没有对应的脚本 会默认返回空
  Lesson3_Test t = this.GetComponent("Lesson3_Test") as Lesson3_Test;
  print(t);
  //根据Type获取
  t = this.GetComponent(typeof(Lesson3_Test)) as Lesson3_Test;
  print(t);
  //根据泛型获取 建议使用泛型获取 因为不用二次转换
  t = this.GetComponent<Lesson3_Test>();
  if( t != null )
  {
      print(t);
  }

  //只要能得到场景中别的对象或者对象依附的脚本

  //那就可以获取到它的所有信息
```

 

```
 //2.得到自己挂载的多个脚本
  Lesson3[] array = this.GetComponents<Lesson3>();
  print(array.Length);
  List<Lesson3> list = new List<Lesson3>();
  this.GetComponents<Lesson3>(list);
  print(list.Count);
```

  

```
//3.得到子对象挂载的脚本(它默认也会找自己身上是否挂载该脚本)
  //函数是有一个参数的 默认不传 是false 意思就是 如果子对象失活 是不会去找这个对象上是否有某个脚本的
  //如果传true 及时 失活 也会找
  //得子对象 挂载脚本 单个
  t = this.GetComponentInChildren<Lesson3_Test>(true);
  print(t);
  //得子对象 挂载脚本 多个

  Lesson3_Test[] lts = this.GetComponentsInChildren<Lesson3_Test>(true);
  print(lts.Length);

  List<Lesson3_Test> list2 = new List<Lesson3_Test>();
  this.GetComponentsInChildren<Lesson3_Test>(true, list2);
  print(list2.Count);
```

 

```
 //4.得到父对象挂载的脚本(它默认也会找自己身上是否挂载该脚本)
  t = this.GetComponentInParent<Lesson3_Test>();
  print(t);
  lts = this.GetComponentsInParent<Lesson3_Test>();
  print(lts.Length);
  //它也有list的 省略不写了 和上面是一样的套路
```

 

```
//5.尝试获取脚本
  Lesson3_Test l3t;
  //提供了一个更加安全的 获取单个脚本的方法 如果得到了 会返回true
  //然后在来进行逻辑处理即可
  if(this.TryGetComponent<Lesson3_Test>(out l3t))
  {
      //逻辑处理
  }
```



### GameObject

#### GameObject中的成员变量

```
//名字
print(this.gameObject.name);
this.gameObject.name = "什么什么";
print(this.gameObject.name);
//是否激活
print(this.gameObject.activeSelf);
//是否是静态
print(this.gameObject.isStatic);
//层级
print(this.gameObject.layer);
//标签
print(this.gameObject.tag);
//transform
//this.transform 通过Mono去得到的依附对象的GameObject的位置信息
//他们得到的信息是一样 都是依附的GameObject的位置信息
```



#### GameObject中的静态方法

##### 创建自带几何体

```
GameObject obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
obj.name = "创建的立方体";
```

##### 查找对象

两种找单个对象的共同点:

1. 无法找到失活的对象的，只能找到 激活的对象
2. 如果场景中 存在多个满足条件的对象，无法准确确定找到的是谁 

```
//1查找单个对象
//通过对象名查找
//这个查找效率比较低下  因为他会在场景中的所有对象去查找
//没有找到 就会返回null
GameObject obj2 = GameObject.Find("什么什么");
if( obj2 != null )
{
    print(obj2.name);
}
else
{
    print("没有找到对应对象");
}
//通过tag来查找对象
//GameObject obj3 = GameObject.FindWithTag("Player");
//该方法和上面这个方法 效果一样 只是名字不一样而已
GameObject obj3 = GameObject.FindGameObjectWithTag("Player");
if (obj3 != null)
{
    print("根据tag找的对象" + obj3.name);
}
else
{
    print("根据tag没有找到对应对象");
}
```

得到某一个单个对象 目前有2种方式

1. 是public从外部面板拖 进行关联
2. 通过API去找

```
//2查找多个对象
//找多个对象的API 只能是通过tag去找多个 通过名字 是没有找多个的方法的

//通过tag找到多个对象
//它也是 只能找到 激活对象 无法找到失活对象
GameObject[] objs = GameObject.FindGameObjectsWithTag("Player");
print("找到tag为Player对象的个数" + objs.Length);
```

还有几个查找对象相关是用的比较少的方法 是GameObject父类 Object提供的方法

##### 额外知识点 Unity中的Object和C#中的万物之父的区别

Unity里面的Object 不是指的万物之父object，Unity里的Object 命名空间在UnityEngine中的 Object类 也是集成万物之父的一个自定义类，C#中的Object 命名空

间是在System中的 

##### 实例化对象（克隆对象）的方法

实例化(克隆)对象 它的作用 是根据一个GameObject对象 创建出一个和它一模一样的对象

`GameObject obj5 = GameObject.Instantiate(myObj);`

如果继承了 MonoBehavior，可以不用写GameObject一样可以使用，因为这个方法时Unity里面的 Object基类提供的 所以可以直接用

`Instantiate(myObj);`

##### 删除对象的方法

`GameObject.Destroy(myObj2);`

`GameObject.Destroy(obj5, 5);`//第二个参数 代表延迟几秒钟删除

`GameObject.Destroy(this);`//Destroy不仅可以删除对象 还可以删除脚本

删除对象有两种作用

1. 是删除指定的一个游戏对象

2. 是删除一个指定的脚本对象

注意：Destroy方法 不会马上移除对象 只是给这个对象加了一个移除标识 ，一般情况下 它会在下一帧时把这个对象移除并从内存中移除。如果没有特殊需求 就是   一定要马上移除一个对象的话，建议使用上面的 Destroy方法 因为 是异步的 降低卡顿的几率。

下面这个方法 就是立即把对象 从内存中移除了 
`GameObject.DestroyImmediate(myObj);`

如果是继承MonoBehavior的类 不用写GameObject

`Destroy(myObj2);`

`DestroyImmediate(myObj);`

##### 过场景不移除 

默认情况 在切换场景时 场景中对象都会被自动删除掉。如果希望某个对象 过场景不被移除 
下面这句代码 就是不想谁过场景被移除 就传谁，一般都是传 依附的GameObject对象
`GameObject.DontDestroyOnLoad(this.gameObject);`
如果继承MonoBehavior也可以直接写
`DontDestroyOnLoad(this.gameObject);`

#### GameObject中的成员方法

##### 创建空物体

```
//new一个GameObject就是在创建一个空物体
GameObject obj6 = new GameObject();
GameObject obj7 = new GameObject("创建的空物体");
GameObject obj8 = new GameObject("顺便加脚本的空物体", typeof(Lesson2),typeof(Lesson1));
```

##### 为对象添加脚本

继承MonoBehavior的脚本 是不能够去new，如果想要动态的添加继承MonoBehavior的脚本 在某一个对象上直接使用GameObject提供的方法即可

`Lesson1 les1 = obj6.AddComponent(typeof(Lesson1)) as Lesson1;`

用泛型更方便

`Lesson2 les2 = obj6.AddComponent<Lesson2>();`

通过返回值 可以得到加入的脚本信息来进行一些处理

得到脚本的成员方法 和继承Mono的类得到脚本的方法 一模一样  

##### 标签比较

```
//下面两种比较的方法 是一样的
if(this.gameObject.CompareTag("Player"))
{
    print("对象的标签 是 Player");
}
if(this.gameObject.tag == "Player")
{
    print("对象的标签 是 Player");
}
```

##### 设置激活失活

false 失活，true 激活
obj6.SetActive(false);
obj7.SetActive(false);
obj8.SetActive(false);

### Time

时间相关内容 主要 用于游戏中参与位移、记时、时间暂停等

#### 时间缩放比例

时间停止
`Time.timeScale = 0;`
回复正常
`Time.timeScale = 1;`
2倍速
`Time.timeScale = 2;`

#### 帧间隔时间

帧间隔时间：最近的一帧 用了多长时间（秒），主要是用来计算位移，路程 = 时间*速度

根据需求选择参与计算的间隔时间，如果希望游戏暂停时就不动的 那就使用`Time.deltaTime`，如果希望 不受暂停影响`Time.unscaledDeltaTime`

#### 游戏开始到现在的时间

主要用来计时 单机游戏中计时

受scale影响`Time.time`

不受scale影响`Time.unscaledTime`

#### 物理帧间隔时间 FixedUpdate

受scale影响`Time.fixedDeltaTime`
不受scale影响`Time.fixedUnscaledDeltaTime`

#### 帧数

从开始到现在游戏跑了多少帧(次循环)`Time.frameCount`

### Mathf

Math是C#中封装好的用于数学计算的工具类 —— 位于System命名空间中

Mathf是Unity中封装好的用于数学计算的工具结构体 —— 位于UnityEngine命名空间中

都是提供来用于进行数学相关计算的

#### Mathf中的常用方法

```
//1.π - PI
print(Mathf.PI);

//2.取绝对值 - Abs
print(Mathf.Abs(-10));
print(Mathf.Abs(-20));
print(Mathf.Abs(1));
//3.向上取整 - CeilToInt
float f = 1.3f;
int i = (int)f;
print(i);
print(Mathf.CeilToInt(f));
print(Mathf.CeilToInt(1.00001f));

//4.向下取整 - FloorToInt
print(Mathf.FloorToInt(9.6f));

//5.钳制函数 - Clamp
print(Mathf.Clamp(10, 11, 20));
print(Mathf.Clamp(21, 11, 20));
print(Mathf.Clamp(15, 11, 20));

//6.获取最大值 - Max
print(Mathf.Max(1, 2, 3, 4, 5, 6, 7, 8));
print(Mathf.Max(1, 2));

//7.获取最小值 - Min
print(Mathf.Min(1, 2, 3, 4, 545, 6, 1123, 123));
print(Mathf.Min(1.1f, 0.4f));

//8.一个数的n次幂 - Pow
print("一个数的n次方" + Mathf.Pow(4, 2));
print("一个数的n次方" + Mathf.Pow(2, 3));

//9.四舍五入 - RoundToInt
print("四舍五入" + Mathf.RoundToInt(1.3f));
print("四舍五入" + Mathf.RoundToInt(1.5f));

//10.返回一个数的平方根 - Sqrt
print("返回一个数的平方根" + Mathf.Sqrt(4));
print("返回一个数的平方根" + Mathf.Sqrt(16));
print("返回一个数的平方根" + Mathf.Sqrt(64));

//11.判断一个数是否是2的n次方 - IsPowerOfTwo
print("判断一个数是否是2的n次方" + Mathf.IsPowerOfTwo(4));
print("判断一个数是否是2的n次方" + Mathf.IsPowerOfTwo(8));
print("判断一个数是否是2的n次方" + Mathf.IsPowerOfTwo(3));
print("判断一个数是否是2的n次方" + Mathf.IsPowerOfTwo(1));

//12.判断正负数 - Sign
print("判断正负数" + Mathf.Sign(0));
print("判断正负数" + Mathf.Sign(10));
print("判断正负数" + Mathf.Sign(-10));
print("判断正负数" + Mathf.Sign(3));
print("判断正负数" + Mathf.Sign(-2));
```

#### Mathf中的常用方法——一般不停计算

```
float start = 0;
float result = 0;
float time = 0;

//插值运算 - Lerp

//Lerp函数公式
//result = Mathf.Lerp(start, end, t);

//t为插值系数，取值范围为 0~1
//result = start + (end - start)*t

//插值运算用法一
//每帧改变start的值——变化速度先快后慢，位置无限接近，但是不会得到end位置
start = Mathf.Lerp(start, 10, Time.deltaTime);

//插值运算用法二
//每帧改变t的值——变化速度匀速，位置每帧接近，当t>=1时，得到结果
time += Time.deltaTime;
result = Mathf.Lerp(start, 10, time);
```



### 三角函数

#### 弧度、角度相互转化

- 弧度转角度

  ```
  float rad = 1;
  float anger = rad * Mathf.Rad2Deg;
  ```

- 角度转弧度

  ```
  anger = 1;
  rad = anger * Mathf.Deg2Rad;
  ```

  

#### 三角函数

注意：Mathf中的三角函数相关函数，传入的参数需要时弧度值

```
Mathf.Sin(30 * Mathf.Deg2Rad);//0.5
Mathf.Cos(60 * Mathf.Deg2Rad);//0.5
```



#### 反三角函数

注意：反三角函数得到的结果是 正弦或者余弦值对应的弧度

```
rad = Mathf.Asin(0.5f);
print(rad * Mathf.Rad2Deg);
rad = Mathf.Acos(0.5f);
print(rad * Mathf.Rad2Deg);
```



### 坐标系

#### 世界坐标系

```
this.transform.position;
this.transform.rotation;
this.transform.eulerAngles;
this.transform.lossyScale;
```

修改他们 会是相对世界坐标系的变化

#### 物体坐标系

相对父对象的物体坐标系的位置 本地坐标 相对坐标

```
this.transform.localPosition;
this.transform.localEulerAngles;
this.transform.localRotation;
this.transform.localScale;
```

修改他们 会是相对父对象物体坐标系的变化

#### 屏幕坐标系

```
Input.mousePosition;
Screen.width;
Screen.height;
```



#### 视口坐标系

摄像机上的 视口范围

#### 坐标转换相关

世界转本地

```
this.transform.InverseTransformDirection;
this.transform.InverseTransformPoint;
this.transform.InverseTransformVector;
```

本地转世界

```
this.transform.TransformDirection;
this.transform.TransformPoint;
this.transform.TransformVector;
```

世界转屏幕

```
Camera.main.WorldToScreenPoint;
```

屏幕转世界

```
Camera.main.ScreenToWorldPoint;
```

世界转视口

```
Camera.main.WorldToViewportPoint;
```

视口转世界

```
Camera.main.ViewportToWorldPoint;
```

视口转屏幕

```
Camera.main.ViewportToScreenPoint;
```

屏幕转视口

```
Camera.main.ScreenToViewportPoint;
```



### Vector3

#### 基础


```
//Vector3主要是用来表示三维坐标系中的 一个点 或者一个向量
//申明
Vector3 v = new Vector3();
v.x = 10;
v.y = 10;
v.z = 10;
//只传xy 默认z是0
Vector3 v2 = new Vector3(10, 10);
//一步到位
Vector3 v3 = new Vector3(10, 10, 10);

Vector3 v4;
v4.x = 10;
v4.y = 10;
v4.z = 10;

//Vector的基本计算
// + - * /
Vector3 v1 = new Vector3(1, 1, 1);
Vector3 v12 = new Vector3(2, 2, 2);
// 对应用x+或者-x.....
print(v1 + v12);
print(v1 - v12);

print(v1 * 10);
print(v12 / 2);
```

```
//常用
print(Vector3.zero);//000
print(Vector3.right);//100
print(Vector3.left);//-100
print(Vector3.forward);//001
print(Vector3.back);//00-1
print(Vector3.up);//010
print(Vector3.down);//0-10
```

计算两个点之间的距离的方法
`Vector3.Distance(v1, v12)`

#### 向量模长

- Vector3有两种几何意义

  1.位置 —— 代表一个点

  ```
  this.transform.position;
  ```

  2.方向 —— 代表一个方向

  ```
  this.transform.forward;
  
  this.transform.up;
  ```

  

- 零向量Vector3.zero

- Vector3中提供了获取向量模长的成员属性magnitude

  ```
  AB.magnitude;//AB为某个向量
  ```

- Vector3中提供了获取单位向量的成员属性normalized（同上）

#### 向量加减乘除

- 向量加法

  ```
  this.transform.position += new Vector3(1, 2, 3);
  this.transform.Translate(Vector3.forward * 5);
  ```

- 向量减法

  ```
  this.transform.position -= new Vector3(1, 2, 3);
  this.transform.Translate(-Vector3.forward * 5);
  ```

  

- 向量乘除标量

  ```
  this.transform.localScale *= 2;
  this.transform.localScale /= 2;
  ```

#### 向量点乘

- 补充知识：调试画线
  画线段 
  前两个参数 分别是 起点 终点

  ```
  Debug.DrawLine(this.transform.position, this.transform.position + this.transform.forward, Color.red);
  ```

  画射线
  前两个参数 分别是 起点 方向

  ```
  Debug.DrawRay(this.transform.position, this.transform.forward, Color.white);
  ```

- 通过点乘判断对象方位

  ```
  float dotResult = Vector3.Dot(this.transform.forward, target.position - this.transform.position);
  if( dotResult >= 0 )
  {
      print("它在我前方");
  }
  else
  {
      print("它在我后方");
  }
  ```

- 通过点乘推导公式算出夹角
  1.用单位向量算出点乘结果

  ```
  dotResult = Vector3.Dot(this.transform.forward, (target.position - this.transform.position).normalized);
  ```

  2.用反三角函数得出角度

  ```
  Mathf.Acos(dotResult) * Mathf.Rad2Deg;
  ```

  Vector3中提供了 得到两个向量之间夹角的方法 

  ```
  Vector3.Angle(this.transform.forward, target.position - this.transform.position);
  ```

  

#### 向量叉乘

- 叉乘计算

  ```
  Vector3.Cross(A.position, B.position);
  ```

- 叉乘几何意义

  假设向量 A和B 都在 XZ平面上，向量A 叉乘 向量 B
  y大于0 证明 B在A右侧
  y小于0 证明 B在A左侧

  ```
  Vector3 C = Vector3.Cross(B.position, A.position);
  if (C.y > 0)
  {
      print("A在B的右侧");
  }
  else
  {
      print("A在B的左侧");
  }
  ```

  

#### 插值运算

- 线性插值

  1.先快后慢 每帧改变start位置 位置无限接近 但不会得到end位置

  ```
  A.position = Vector3.Lerp(A.position, target.position, Time.deltaTime);
  ```

  2.匀速 每帧改变时间  当t>=1时 得到结果

  这种匀速移动 当time>=1时  改变了目标位置后  它会直接瞬移到目标位置

  ```
  if(nowTarget != target.position)
  {
      nowTarget = target.position;
      time = 0;
      startPos = B.position;
  }
  time += Time.deltaTime;
  B.position = Vector3.Lerp(startPos, nowTarget, time);
  ```

- 球形插值

  ```
  C.position = Vector3.Slerp(Vector3.right * 10, Vector3.left * 10 + Vector3.up*0.1f, time*0.01f);
  ```

  

### 四元数

#### 四元数 Quaternion

四元数Q = [cos(β / 2), sin(β / 2)x, sin(β / 2)y, sin(β / 2)z]
计算原理

```
Quaternion q = new Quaternion(Mathf.Sin(30 * Mathf.Deg2Rad), 0, 0, Mathf.Cos(30 * Mathf.Deg2Rad));
```

提供的轴角对 初始化 四元数的方法

```
Quaternion q = Quaternion.AngleAxis(60, Vector3.right);
```

创建一个立方体

```
GameObject obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
obj.transform.rotation = q;
```

#### 四元数和欧拉角转换

1.欧拉角转四元数

```
Quaternion q2 = Quaternion.Euler(60, 0, 0);
GameObject obj2 = GameObject.CreatePrimitive(PrimitiveType.Cube);
obj2.transform.rotation = q2;
```

2.四元数转欧拉角

```
print(q2.eulerAngles);
```

#### 四元数弥补的欧拉角缺点

1.同一旋转的表示不唯一  四元数旋转后 转换后的欧拉角 始终是 - 180~180度

2.万向节死锁 通过四元数旋转对象可以避免万向节死锁

#### 四元数常用方法

```
public Transform testObj;
public Transform target;
public Transform A;
public Transform B;
private Quaternion start;
private float time;
public Transform lookA;
public Transform lookB;

void Start()
{
//单位四元数
print(Quaternion.identity);
testObj.rotation = Quaternion.identity;
Instantiate(testObj, Vector3.zero, Quaternion.identity);
//插值运算
start = B.transform.rotation;
}

void Update()
{
//无限接近 先快后慢
A.transform.rotation = Quaternion.Slerp(A.transform.rotation, target.rotation, Time.deltaTime);

//匀速变化 time>= 1到达目标
time += Time.deltaTime;
B.transform.rotation = Quaternion.Slerp(start, target.rotation, time);

//LookRotation
Quaternion q = Quaternion.LookRotation(lookB.position - lookA.position);
lookA.rotation = q;
lookA.MyLookAt(lookB);
}
```

#### 四元数相乘

```
Quaternion q = Quaternion.AngleAxis(20, Vector3.up);
this.transform.rotation *= q;
```



#### 四元数乘向量

```
Vector3 v = Vector3.forward;

v = Quaternion.AngleAxis(45, Vector3.up) * v;
```



### Transform

游戏对象（GameObject）位移、旋转、缩放、父子关系、坐标转换等相关操作都由它处理，它是Unity提供的极其重要的类

#### 位置

相对世界坐标系

`this.gameObject.transform`

通过position得到的位置 是相对于 世界坐标系的 原点的位置

可能和面板上显示的 是不一样的

因为如果对象有父子关系 并且父对象位置 不在原点 那么 和面板上肯定就是不一样的

`this.transform.position`

相对父对象

这两个坐标很重要 如果想以面板坐标为准来进行位置设置，那一定是通过localPosition来进行设置的
`this.transform.localPosition`

这两个可能出现是一样的情况：

1. 父对象的坐标 就是世界坐标系原点0,0,0
2. 对象没有父对象 

注意：位置的赋值不能直接改变x，y，z 只能整体改变，不能单独改 x y z某一个值

```
this.transform.position.x = 10;
this.transform.position = new Vector3(10, 10, 10);
this.transform.localPosition = Vector3.up * 10;
```

如果只想改一个值x y和z要保持原有坐标一致

1. 直接赋值

   ```
   this.transform.position = new Vector3(19, this.transform.position.y, this.transform.position.z);
   ```

2. 先取出来 再赋值
   虽然不能直接改 transform的 xyz 但是 Vector3是可以直接改 xyz的，所以可以先取出来改Vector3 再重新赋值
   
   ```
   Vector3 vPos = this.transform.localPosition;
   vPos.x = 10;
   this.transform.localPosition = vPos;
   ```
   
   

如果想得到对象当前的 一个朝向，那么就是通过 trnasform.出来的 
对象当前的面朝向`this.transform.forward`
对象当前的头顶朝向`this.transform.up`
对象当前的右手边`this.transform.right`

#### 位移

理解坐标系下的位移计算公式：路程 = 方向 * 速度 * 时间

##### 方式一 自己计算

想要变化的 就是 position，用当前的位置 + 我要动多长距离  得出最终所在的位置

```
this.transform.position = this.transform.position + this.transform.up * 1 * Time.deltaTime;
```

因为用的是 this.transform.forward 所以它始终会朝向相对于自己的面朝向去动

```
this.transform.position += this.transform.forward * 1 * Time.deltaTime;
```

方向非常重要 因为 它决定了前进方向

```
this.transform.position += Vector3.forward * 1 * Time.deltaTime;
```



##### 方式二 API

参数一：表示位移多少  路程 = 方向 * 速度 * 时间
参数二：表示 相对坐标系   默认 该参数 是相对于自己坐标系的

相对于世界坐标系的 Z轴 动  始终是朝 世界坐标系 的 Z轴正方向移动

```
this.transform.Translate(Vector3.forward * 1 * Time.deltaTime, Space.World);
```

相对于世界坐标的 自己的面朝向去动   始终朝自己的面朝向移动

```
this.transform.Translate(this.transform.forward * 1 * Time.deltaTime, Space.World);
```

相对于自己的坐标系 下的 自己的面朝向向量移动 （一定不会这样让物体移动）

```
this.transform.Translate(this.transform.forward * 1 * Time.deltaTime, Space.Self);
```

相对于自己的坐标系 下的 Z轴正方向移动  始终朝自己的面朝向移动

```
this.transform.Translate(Vector3.forward * 1 * Time.deltaTime, Space.Self);
```

注意：一般使用API来进行位移

#### 角度

相对世界坐标角度

```
this.transform.eulerAngles
```

相对父对象角度

```
this.transform.localEulerAngles
```

注意：设置角度和设置位置一样 不能单独设置xyz 要一起设置
如果希望改变的 角度 是面板上显示的内容 那一点是改变 相对父对象的角度

```
this.transform.localEulerAngles = new Vector3(10, 10, 10);
this.transform.eulerAngles = new Vector3(10, 10, 10);
this.transform.localEulerAngles;
```



#### 旋转

##### 自己计算（同上省略）

##### API计算

自转：

每个轴 具体转多少度
第一个参数 相当于 是旋转的角度 每一帧 
第二个参数 默认不填 就是相对于自己坐标系 进行的旋转

```
this.transform.Rotate(new Vector3(0, 10, 0) * Time.deltaTime);
this.transform.Rotate(new Vector3(0, 10, 0) * Time.deltaTime, Space.World);
```

相对于某个轴 转多少度
参数一：是相对哪个轴进行转动
参数二：是转动的 角度 是多少
参数三：默认不填 就是相对于自己的坐标系 进行旋转，如果填  可以填写相对于 世界坐标系进行旋转

```
this.transform.Rotate(Vector3.right, 10 * Time.deltaTime);
this.transform.Rotate(Vector3.right, 10 * Time.deltaTime, Space.World);
```

相对于某一个点转
参数一：相当于哪一个点 转圈圈
参数二：相对于那一个点的 哪一个轴转圈圈
参数三：转的度数  旋转速度 * 时间

```
this.transform.RotateAround(Vector3.zero, Vector3.right, 10 * Time.deltaTime);
```



#### 缩放

相对世界坐标系`this.transform.lossyScale;`
相对本地坐标系（父对象）`this.transform.localScale;`

注意：
1.同样缩放不能只改xyz 只能一起改(相对于世界坐标系的缩放大小只能得 不能改)，所以一般要修改缩放大小 都是改的 相对于父对象的 缩放大小 localScale

```
this.transform.localScale = new Vector3(3, 3, 3);
```

2.Unity没有提供关于缩放的API，之前的 旋转 位移 都提供了 对应的 API 但是 缩放并没有

如果想要 让 缩放 发生变化 只能自己去写(自己算)

```
this.transform.localScale += Vector3.one * Time.deltaTime;
```



#### 看向

让一个对象的面朝向 可以一直看向某一个点或者某一个对象
看向一个点 相对于世界坐标系的

```
this.transform.LookAt(Vector3.zero);
```

看向一个对象 就传入一个对象的  Transform信息

```
this.transform.LookAt(lookAtObj);
```



#### 父子关系

##### 获取和设置父对象

获取父对象

```
this.transform.parent.name;
```

设置父对象 断绝父子关系

```
this.transform.parent = null;
```

设置父对象 认爸爸

```
this.transform.parent = GameObject.Find("Father2").transform;
```

通过API来进行父子关系的设置

```
this.transform.SetParent(null);//断绝父子关系

this.transform.SetParent(GameObject.Find("Father2").transform);//认爸爸
```

参数一：我的父亲

参数二：是否保留世界坐标的 位置 角度 缩放 信息
       true  会保留 世界坐标下的状态  和 父对象 进行计算 得到本地坐标系的信息
       false 不会保留 会直接把世界坐标系下的 位置角度缩放 直接赋值到 本地坐标系下 

```
this.transform.SetParent(GameObject.Find("Father3").transform, false);
```

和自己的**所有**儿子 断绝关系 没有父子关系了

```
this.transform.DetachChildren();
```



##### 获取子对象

- 按名字查找儿子
  找到儿子的 transform信息
  Find方法 是能够找到 失活的对象的 ！！ GameObject相关的 查找 是不能找到失活对象的

  ```
  this.transform.Find("Cube (1)").name;
  ```

  他只能找到自己的儿子 找不到自己的孙子 ！！

  ```
  this.transform.Find("GameObject").name;
  ```

  虽然它的效率 比GameObject.Find相关 要高一些 但是 前提是必须知道父亲是谁 才能找



- 遍历儿子

  如何得到有多少个儿子

  1. 失活的儿子也会算数量

  2. 找不到孙子 所以孙子不会算数量

   ```
   this.transform.childCount;
   ```

   //通过索引号 去得到自己对应的儿子
   //如果编号 超出了儿子数量的范围 那会直接报错的 
   //返回值 是 transform 可以得到对应儿子的 位置相关信息

   ```
   this.transform.GetChild(0);
   ```

   

  ```
  for (int i = 0; i < this.transform.childCount; i++)
  {
      print("儿子的名字：" + this.transform.GetChild(i).name);
  }
  ```



##### 儿子的操作

- 判断自己的爸爸是谁
  一个对象 判断自己是不是另一个对象的儿子
  
  ```
  if(son.IsChildOf(this.transform))
  {
      print("是我的儿子");
  }
  ```
  
  

- 得到自己作为儿子的编号
  
  ```
  son.GetSiblingIndex();
  ```
  
  
  
- 把自己设置为第一个儿子
  
  ```
  son.SetAsFirstSibling();
  ```
  
  
  
- 把自己设置为最后一个儿子
  
  ```
  son.SetAsLastSibling();
  ```
  
  
  
- 把自己设置为指定个儿子
  就算填的数量 超出了范围（负数或者更大的数） 不会报错 会直接设置成最后一个编号
  
  ```
  son.SetSiblingIndex(1);
  ```
  
  

#### 坐标转换

##### 世界坐标转本地坐标

`Vector3.forward;`

世界坐标系 转本地坐标系 可以大概判断一个相对位置

- 世界坐标系的点 转换 为相对本地坐标系的点 
  受到缩放影响

  ```
  this.transform.InverseTransformPoint(Vector3.forward);
  ```

  

- 世界坐标系的方向 转换 为相对本地坐标系的方向 
  不受缩放影响

  ```
  this.transform.InverseTransformDirection(Vector3.forward);
  ```

  受缩放影响

  ```
  this.transform.InverseTransformVector(Vector3.forward);
  ```

  

##### 本地坐标转世界坐标

- 本地坐标系的点 转换 为相对世界坐标系的点 受到缩放影响

  ```
  this.transform.TransformPoint(Vector3.forward);
  ```

  

- 本地坐标系的方向 转换 为相对世界坐标系的方向 
  不受缩放影响

  ```
  this.transform.TransformDirection(Vector3.forward);
  ```

  受缩放影响

  ```
  this.transform.TransformVector(Vector3.forward);
  ```

  

### 输入相关Input

输入相关内容写在Update中

#### 鼠标在屏幕位置

屏幕坐标的原点 是在 屏幕的左下角  往右是X轴正方向 往上时Y轴正方向
返回值时Vector3 但是只有 x和y有值 z一直是0 是因为屏幕本来就是2D的 不存在Z轴

```
Input.mousePosition;
```



#### 检测鼠标输入

0左键 1右键 2中键
只要按下的这一瞬间 进入一次

```
if( Input.GetMouseButtonDown(0) )
{
    print("鼠标左键按下了");
}
```

鼠标抬起一瞬间 进入

```
if( Input.GetMouseButtonUp(0) )
{
    print("鼠标左键抬起了");
}
```

鼠标长按按下抬起都会进入
就是 当按住按键不放时 会一直进入 这个判断

```
if( Input.GetMouseButton(1))
{
    print("右键按下");
}
```

中键滚动
返回值的 y -1往下滚  0没有滚  1往上滚
它的返回值 是Vector的值 鼠标中键滚动 会改变其中的Y值

```
Input.mouseScrollDelta;
```



#### 检测键盘输入

键盘按下

```
if( Input.GetKeyDown(KeyCode.W) )
{
    print("W键按下");
}
```

传入字符串的重载
这里传入的 字符串 不能是大写的 不然会报错
只能传入小写字符串

```
if( Input.GetKeyDown("q") )
{
    print("q按下");
}
```


键盘抬起

```
if( Input.GetKeyUp(KeyCode.W) )
{
    print("W键抬起");
}
```

键盘长按

```
if( Input.GetKey(KeyCode.W) )
{
    print("W键长按");
}
```



#### 检测默认轴输入

键盘AD按下时 返回 -1到1之间的变换
相当于 得到得这个值 就是 左右方向 可以通过它来控制 对象左右移动 或者左右旋转

```
Input.GetAxis("Horizontal");
```

键盘SW按下时 返回 -1到1之间的变换
得到得这个值 就是 上下方向 可以通过它来控制 对象上下移动 或者上下旋转

```
Input.GetAxis("Vertical");
```

鼠标横向移动时 -1 到 1 左 右

```
Input.GetAxis("Mouse X");
```

鼠标竖向移动时  -1 到 1 下 上

```
Input.GetAxis("Mouse Y");
```

默认的 GetAxis方法 是有渐变的 会总 -1~0~1之间 渐变 会出现小数

GetAxisRaw方法 和 GetAxis使用方式相同，只不过 它的返回值 只会是 -1 0 1 不会有中间值

#### 其它

是否有任意键或鼠标长按

```
if(Input.anyKey)
{
    print("有一个键长按");
}
```

是否有任意键或鼠标按下

```
if(Input.anyKeyDown)
{
    print("有一个键 按下");
    //这一帧的键盘输入
    print(Input.inputString);
}
```

手柄输入相关

```
//得到连接的手柄的所有按钮名字
string[] strs = Input.GetJoystickNames();

//某一个手柄键按下
if( Input.GetButtonDown("Jump") )
{

}

//某一个手柄键抬起
if (Input.GetButtonUp("Jump"))
{

}

//某一个手柄键长按
if (Input.GetButton("Jump"))
{

}
```

移动设备触摸相关

```
if(Input.touchCount > 0)
{
    Touch t1 = Input.touches[0];
    //位置
    print(t1.position);
    //相对上次位置的变化
    print(t1.deltaPosition);
}

//是否启用多点触控
Input.multiTouchEnabled = false;

//陀螺仪（重力感应）
//是否开启陀螺仪 必须开启 才能正常使用
Input.gyro.enabled = true;
//重力加速度向量
print(Input.gyro.gravity);
//旋转速度
print(Input.gyro.rotationRate);
//陀螺仪 当前的旋转四元数 
//比如 用这个角度信息 来控制 场景上的一个3D物体受到重力影响
//手机怎么动 它怎么动
print(Input.gyro.attitude);
```



### 屏幕相关Screen

#### 静态属性

##### 常用

当前屏幕分辨率

```
Resolution r = Screen.currentResolution;
print("当前屏幕分辨率的宽" + r.width + "高" + r.height);
```

屏幕窗口当前宽高
这得到的 是当前 窗口的 宽高 不是设备分辨率的宽高
一般写代码 要用窗口宽高 做计算时 就用他们

```
Screen.width;
Screen.height;
```

屏幕休眠模式 

```
Screen.sleepTimeout = SleepTimeout.NeverSleep;
```



##### 不常用

运行时是否全屏模式Screen.fullScreen = true;
独占全屏FullScreenMode.ExclusiveFullScreen
全屏窗口FullScreenMode.FullScreenWindow
最大化窗口FullScreenMode.MaximizedWindow
窗口模式FullScreenMode.Windowed
Screen.fullScreenMode = FullScreenMode.Windowed;

移动设备屏幕转向相关
允许自动旋转为左横向 Home键在左
Screen.autorotateToLandscapeLeft = true;
允许自动旋转为右横向 Home键在右
Screen.autorotateToLandscapeRight = true;
允许自动旋转到纵向 Home键在下
Screen.autorotateToPortrait = true;
允许自动旋转到纵向倒着看 Home键在上
Screen.autorotateToPortraitUpsideDown = true;

指定屏幕显示方向
Screen.orientation = ScreenOrientation.Landscape;

#### 静态方法

设置分辨率 一般移动设备不使用
Screen.SetResolution(1920, 1080, false);

### Camera

#### 重要静态成员

- 获取摄像机
  如果用之前的知识 来获取摄像机
  主摄像机的获取
  如果想通过这种方式 快速获取摄像机 那么场景上必须有一个 tag为MainCamera的摄像机
  
  ```
  Camera.main.name;
  ```
  
  获取摄像机的数量
  
  ```
  Camera.allCamerasCount;
  ```
  
  得到所有摄像机
  
  ```
  Camera[] allCamera = Camera.allCameras;
  ```
  
  

- 渲染相关委托
  摄像机剔除前处理的委托函数

  ```
  Camera.onPreCull += (c) =>
  {
  };
  ```

  摄像机 渲染前处理的委托

  ```
  Camera.onPreRender += (c) =>
  {
  };
  ```

  摄像机 渲染后 处理的委托

  ```
  Camera.onPostRender += (c) =>
  {
  };
  ```

  

#### 重要成员

- 界面上的参数 都可以在Camera中获取到
  比如 下面这句代码 就是得到主摄像机对象 上的深度 进行设置

  ```
  Camera.main.depth = 10;
  ```

  

- 世界坐标转屏幕坐标
  转换过后 x和y对应的就是屏幕坐标 z对应的 是 这个3D物体里摄像机有多远
  用这个来做的功能 最多的 就是头顶血条相关的功能

  ```
  Vector3 v = Camera.main.WorldToScreenPoint(this.transform.position);
  print(v);
  ```

  

- 屏幕坐标转世界坐标
  只所以改变Z轴 是因为 如果不改 Z默认为0
  转换过去的世界坐标系的点 永远都是一个点 可以理解为 视口 相交的焦点
  如果改变了Z 那么转换过去的 世界坐标的点 就是相对于 摄像机前方多少的单位的横截面上的世界坐标点

  ```
  Vector3 v = Input.mousePosition;
  v.z = 5;
  obj.position = Camera.main.ScreenToWorldPoint(v);
  print(Camera.main.ScreenToWorldPoint(v));
  ```

  

### 光源系统

### 物理系统

#### 碰撞检测函数

碰撞和触发响应函数属于特殊的生命周期函数也是通过反射调用

碰撞和触发器函数都可以写成虚函数在子类去重写逻辑，一般会把想要重写的 碰撞和触发函数 写成保护类型的 没有必要写成public 因为不会自己手动调用 都是Unity通过反射自动调用的

##### 物理碰撞检测响应函数

```
//碰撞触发接触时会 自动执行这个函数
private void OnCollisionEnter(Collision collision)
{
    //Collision类型的 参数 包含了 碰到自己的对象的相关信息

//关键参数
//1.碰撞到的对象碰撞器的信息
//collision.collider

//2.碰撞对象的依附对象（GameObject）
//collision.gameObject

//3.碰撞对象的依附对象的位置信息
//collision.transform

//4.触碰点数相关
//collision.contactCount
//接触点 具体的坐标
//ContactPoint[] pos = collision.contacts;

//只要得到了 碰撞到的对象的 任意一个信息 就可以得到它的所有信息

print(this.name + "被" + collision.gameObject.name + "撞到了");

}

//碰撞结束分离时  会自动执行的函数
private void OnCollisionExit(Collision collision)
{
    print(this.name + "被" + collision.gameObject.name + "结束碰撞了");
}

//两个物体相互接触摩擦时 会不停的调用该函数
private void OnCollisionStay(Collision collision)
{
    print(this.name + "一直在和" + collision.gameObject.name + "接触");
}
```



##### 触发器检测响应函数

```
//触发开始的函数 当第一次接触时 会自动调用
protected virtual void OnTriggerEnter(Collider other)
{
    print(this.name + "被" + other.gameObject.name + "触发了");
}

//触发结束的函数 当水乳相融的状态结束时 会调用一次
private void OnTriggerExit(Collider other)
{
    print(this.name + "被" + other.gameObject.name + "结束水乳相融的状态了");
}

//当两个对象 水乳相融的时候 会不停调用
private void OnTriggerStay(Collider other)
{
    print(this.name + "和" + other.gameObject.name + "正在水乳相融");
}
```



##### 要明确什么时候会响应函数

1. 只要挂载的对象 能和别的物体产生碰撞或者触发 那么对应的这6个函数 就能够被响应
2. 6个函数不是都得写 一般是根据需求来进行选择书写
3. 如果是一个异形物体，刚体在父对象上，如果想通过子对象上挂脚本检测碰撞是不行的 必须挂载到这个刚体父对象上才行
4. 要明确 物理碰撞和触发器响应的区别

#### 刚体加力

##### 刚体自带添加力的方法

给刚体加力的目标就是让其有一个速度 朝向某一个方向移动

- 首先应该获取刚体组件

  ```
  rigidBody = this.GetComponent<Rigidbody>();
  ```

  

- 添加力
  相对世界坐标
  世界坐标系 Z轴正方向加了一个里
  加力过后 对象是否停止移动 是由阻力决定的
  如果阻力为0 那给了一个力过后 始终 是不会停止运动

  ```
  rigidBody.AddForce(Vector3.forward * 10);
  ```

  如果想要在 世界坐标系方法中 让对象 相对于自己的面朝向动

  ```
  rigidBody.AddForce(this.transform.forward * 10);
  ```

  相对本地坐标

  ```
  rigidBody.AddRelativeForce(Vector3.forward * 10);
  ```

  

- 添加扭矩力，让其旋转
  相对世界坐标

  ```
  rigidBody.AddTorque(Vector3.up * 10);
  ```

  相对本地坐标

  ```
  rigidBody.AddRelativeTorque(Vector3.up * 10);
  ```

  

- 直接改变速度
  这个速度方向 是相对于 世界坐标系的 
  如果要直接通过改变速度 来让其移动 一定要注意这一点

  ```
  rigidBody.velocity = Vector3.forward * 5;
  ```

  

- 模拟爆炸效果
  模拟爆炸的力 一定是 所有希望产生爆炸效果影响的对象 
  都需要得到他们的刚体 来执行这个方法 才能都有效果

  ```
  rigidBody.AddExplosionForce(100, Vector3.zero, 10);
  ```

  



##### 力的几种模式

第二个参数 力的模式 主要的作用 就是 计算方式不同而已 
由于4中计算方式的不同 最终的移动速度就会不同

```
rigidBody.AddForce(Vector3.forward * 10, ForceMode.Acceleration);
```

- 动量定理
  Ft = mv
  v = Ft/m;
  F:力
  t：时间
  m:质量
  v:速度

1. Acceleration 
   给物体增加一个持续的加速度，忽略其质量
   v = Ft/m
   F:(0,0,10)
   t:0.02s
   m:默认为1
   v = 10 * 0.02/ 1 = 0.2m/s
   每物理帧移动0.2m/s * 0.02 = 0.004m

2. Force
   给物体添加一个持续的力，与物体的质量有关
   v = Ft/m
   F:(0,0,10)
   t:0.02s
   m:2kg
   v = 10 * 0.02/ 2 = 0.1m/s
   每物理帧移动0.1m/s * 0.02 = 0.002m

3. Impulse
   给物体添加一个瞬间的力，与物体的质量有关,忽略时间 默认为1
   v = Ft/m
   F:(0,0,10)
   t:默认为1
   m:2kg
   v = 10 * 1/ 2 = 5m/s
   每物理帧移动5m/s * 0.02 = 0.1m

4. VelocityChange
   给物体添加一个瞬时速度，忽略质量，忽略时间
   v = Ft/m
   F:(0,0,10)
   t:默认为1
   m:默认为1
   v = 10 * 1/ 1 = 10m/s
   每物理帧移动10m/s * 0.02 = 0.2m



##### 力场脚本

constant force

##### 刚体的休眠

```
//获取刚体是否处于休眠状态 如果是 
if (rigidBody.IsSleeping())
{
    //就唤醒它
    rigidBody.WakeUp();
}
```

#### 碰撞检测

碰撞产生的必要条件
1.至少一个物体有刚体
2.两个物体都必须有碰撞器

碰撞和触发
碰撞会产生实际的物理效果
触发看起来不会产生碰撞但是可以通过函数监听触发

碰撞检测主要用于实体物体之间产生物理效果时使用

#### 范围检测

必备条件：想要被范围检测到的对象 必须具备碰撞器
注意点：
1.范围检测相关API 只有当执行该句代码时 进行一次范围检测 它是瞬时的
2.范围检测相关API 并不会真正产生一个碰撞器 只是碰撞判断计算而已

##### 盒状范围检测

参数一：立方体中心点
参数二：立方体三边大小
参数三：立方体角度
参数四：检测指定层级（不填检测所有层）
参数五：是否忽略触发器 UseGlobal-使用全局设置 Collide - 检测触发器 Ignore - 忽略触发器 不填使用UseGlobal
返回值：在该范围内的触发器（得到了对象触发器就可以得到对象的所有信息）

```
print(LayerMask.NameToLayer("UI"));
Collider[] colliders = Physics.OverlapBox( Vector3.zero, Vector3.one, Quaternion.AngleAxis(45, Vector3.up), 
                    1 << LayerMask.NameToLayer("UI") |
                    1 << LayerMask.NameToLayer("Default"), QueryTriggerInteraction.UseGlobal);

for (int i = 0; i < colliders.Length; i++)
{
    print(colliders[i].gameObject.name);
}
```

0000 0001
0010 0000

重要知识点：
关于层级
通过名字得到层级编号 LayerMask.NameToLayer
需要通过编号左移构建二进制数
这样每一个编号的层级 都是 对应位为1的2进制数
通过 位运算 可以选择想要检测层级
好处 一个int 就可以表示所有想要检测的层级信息

层级编号是 0~31 刚好32位
是一个int数
每一个编号 代表的 都是二进制的一位
0—— 1 << 0——0000 0000 0000 0000 0000 0000 0000 0001 = 1
1—— 1 << 1——0000 0000 0000 0000 0000 0000 0000 0010 = 2
2—— 1 << 2——0000 0000 0000 0000 0000 0000 0000 0100 = 4
3—— 1 << 3——0000 0000 0000 0000 0000 0000 0000 1000 = 8
4—— 1 << 4——0000 0000 0000 0000 0000 0000 0001 0000 = 16
5—— 1 << 5——0000 0000 0000 0000 0000 0000 0010 0000 = 32

另一个API
返回值：碰撞到的碰撞器数量
参数：传入一个数组进行存储

```
Physics.OverlapBoxNonAlloc()

if (Physics.OverlapBoxNonAlloc(Vector3.zero, Vector3.one, colliders) != 0)
{

}
```

##### 球形范围检测

参数一：中心点
参数二：球半径
参数三：检测指定层级（不填检测所有层）
参数四：是否忽略触发器 UseGlobal-使用全局设置 Collide - 检测触发器 Ignore - 忽略触发器 不填使用UseGlobal
返回值：在该范围内的触发器（得到了对象触发器就可以得到对象的所有信息）

```
colliders = Physics.OverlapSphere(Vector3.zero, 5, 1 << LayerMask.NameToLayer("Default"));
```

另一个API
返回值：碰撞到的碰撞器数量
参数：传入一个数组进行存储

```
Physics.OverlapSphereNonAlloc

if ( Physics.OverlapSphereNonAlloc(Vector3.zero, 5, colliders) != 0 )
{

}
```

##### 胶囊范围检测

参数一：半圆一中心点
参数二：半圆二中心点
参数三：半圆半径
参数四：检测指定层级（不填检测所有层）
参数五：是否忽略触发器 UseGlobal-使用全局设置 Collide - 检测触发器 Ignore - 忽略触发器 不填使用UseGlobal
返回值：在该范围内的触发器（得到了对象触发器就可以得到对象的所有信息）

```
colliders = Physics.OverlapCapsule(Vector3.zero, Vector3.up, 1, 1 << LayerMask.NameToLayer("UI"), QueryTriggerInteraction.UseGlobal);
```

另一个API
返回值：碰撞到的碰撞器数量
参数：传入一个数组进行存储

```
Physics.OverlapCapsuleNonAlloc

if ( Physics.OverlapCapsuleNonAlloc(Vector3.zero, Vector3.up, 1, colliders ) != 0 )
{

}
```



#### 射线检测

##### 射线对象

- 3D世界中的射线
  假设有一条起点为坐标(1, 0, 0)，方向为世界坐标Z轴正方向的射线
  注意：
  参数一：起点
  参数二：方向（一定记住 不是两点决定射线方向，第二个参数 直接就代表方向向量）

  目前只是申明了一个射线对象，没有任何的用处

  ```
  Ray r = new Ray(Vector3.right, Vector3.forward);
  //Ray中的参数
  print(r.origin);//起点
  print(r.direction);//方向
  ```

- 摄像机发射出的射线

  得到一条从屏幕位置作为起点，摄像机视口方向为 方向的射线

  ```
  Ray r2 = Camera.main.ScreenPointToRay(Input.mousePosition);
  ```

  

##### 碰撞检测函数

射线检测也是瞬时的，执行代码时进行一次射线检测

######  最原始的射线检测

准备一条射线

```
Ray r3 = new Ray(Vector3.zero, Vector3.forward);
```

进行射线检测 如果碰撞到对象 返回true
参数一：射线
参数二: 检测的最大距离 超出这个距离不检测
参数三：检测指定层级（不填检测所有层）
参数四：是否忽略触发器 UseGlobal-使用全局设置 Collide - 检测触发器 Ignore - 忽略触发器 不填使用UseGlobal
返回值：bool 当碰撞到对象时 返回 true 没有 返回false

```
if (Physics.Raycast(r3, 1000, 1 << LayerMask.NameToLayer("Monster"), QueryTriggerInteraction.UseGlobal))
{
print("碰撞到了对象");
}
```

 还有一种重载 不用传入 射线 直接传入起点 和 方向 也可以用于判断
 就是把 第一个参数射线 变成了 射线的 两个点 一个起点 一个方向

```
if (Physics.Raycast(Vector3.zero, Vector3.forward, 1000, 1 << LayerMask.NameToLayer("Monster"), QueryTriggerInteraction.UseGlobal))
 {
     print("碰撞到了对象2");
 }
```

######  获取相交的单个物体信息

 物体信息类 RaycastHit

```
 RaycastHit hitInfo;
```

 参数一：射线
 参数二：RaycastHit是结构体 是值类型 Unity会通过out 关键在 在函数内部处理后 得到碰撞数据后返回到该参数中
 参数三：距离
 参数四：检测指定层级（不填检测所有层）
 参数五：是否忽略触发器 UseGlobal-使用全局设置 Collide - 检测触发器 Ignore - 忽略触发器 不填使用UseGlobal

```
if (Physics.Raycast(r3, out hitInfo, 1000, 1 << LayerMask.NameToLayer("Monster"), QueryTriggerInteraction.UseGlobal))
 {
     print("碰撞到了物体 得到了信息");

 碰撞器信息
 print("碰撞到物体的名字" + hitInfo.collider.gameObject.name);
 碰撞到的点
 print(hitInfo.point);
 法线信息
 print(hitInfo.normal);

 得到碰撞到对象的位置
 print(hitInfo.transform.position);

 得到碰撞到对象 离自己的距离
 print(hitInfo.distance);

 RaycastHit 该类不仅可以得到碰撞到的对象信息
 还可以得到一些 碰撞的点 距离 法线等等的信息

 }
```

 还有一种重载 不用传入 射线 直接传入起点 和 方向 也可以用于判断

```
if (Physics.Raycast(Vector3.zero, Vector3.forward, out hitInfo, 1000, 1 << LayerMask.NameToLayer("Monster"), QueryTriggerInteraction.UseGlobal))
 {

 }
```

######  获取相交的多个物体

 可以得到碰撞到的多个对象
 如果没有 就是容量为0的数组
 参数一：射线
 参数二：距离
 参数三：检测指定层级（不填检测所有层）
 参数四：是否忽略触发器 UseGlobal-使用全局设置 Collide - 检测触发器 Ignore - 忽略触发器 不填使用UseGlobal

```
RaycastHit[] hits = Physics.RaycastAll(r3, 1000, 1 << LayerMask.NameToLayer("Monster"), QueryTriggerInteraction.UseGlobal);
 for (int i = 0; i < hits.Length; i++)
 {
     print("碰到的所有物体 名字分别是" + hits[i].collider.gameObject.name);
 }
```

 还有一种重载 不用传入 射线 直接传入起点 和 方向 也可以用于判断
 之前的参数一射线 通过两个点传入

```
hits = Physics.RaycastAll(Vector3.zero, Vector3.forward, 1000, 1 << LayerMask.NameToLayer("Monster"), QueryTriggerInteraction.UseGlobal);
```

 还有一种函数 返回的碰撞的数量 通过out得到数据

```
if (Physics.RaycastNonAlloc(r3, hits, 1000, 1 << LayerMask.NameToLayer("Monster"), QueryTriggerInteraction.UseGlobal) > 0)
 {

 }
```



##### 使用时注意的问题

距离、层级两个参数 都是int类型，当传入参数时 一定要明确传入的参数代表的是距离还是层级

```
这样写是错误的 因为第二个参数 代表的是距离 不是层级
if(Physics.Raycast(r3, 1000, 1 << LayerMask.NameToLayer("Monster")))
{

}
```



### 音效系统

#### 代码控制音频源

##### 代码控制播放停止

```
if( Input.GetKeyDown(KeyCode.P) )
{
    //播放音效
    audioSource.Play();
    //延迟播放 填写的是秒数
    //audioSource.PlayDelayed(5);
}
if (Input.GetKeyDown(KeyCode.S))
{
    //停止音效
    audioSource.Stop();
}
if( Input.GetKeyDown(KeyCode.Space) )
{
    //暂停
    audioSource.Pause();
}

if( Input.GetKeyDown(KeyCode.X) )
{
    //停止暂停 和暂停后 Play效果是一样的 都会继续播放现在的音效
    audioSource.UnPause();
}
```



##### 检测音效播放完毕

如果希望某一个音效播放完毕后 想要做什么事情，那就可以在Update生命周期函数中 不停的去检测 它的 该属性
如果是false就代表播放完毕了

```
if(audioSource.isPlaying)
{
    print("播放中");
}
else
{
    print("播放结束");
}
```



##### 动态控制音效播放

1. 直接在要播放音效的对象上挂载脚本 控制播放

2. 实例化挂载了音效源脚本的对象
   这种方法 其实用的比较少

   ```
   Instantiate(obj);
   ```

   

3. 用一个AudioSource来控制播放不同的音效

   ```
   AudioSource aus = this.gameObject.AddComponent<AudioSource>();
   aus.clip = clip;
   aus.Play();
   ```

   

一个GameObject可以挂载多个 音效源脚本AudioSource
使用时要注意 如果要挂载多个 那一定要自己管理他们 控制他们的播放 停止 不然没有办法准确的获取谁是谁



#### 麦克风输入相关

##### 获取设备麦克风信息

```
string[] strs = Microphone.devices;
for (int i = 0; i < strs.Length; i++)
{
    print(strs[i]);
}
```



##### 开始录制

参数一：设备名 传空使用默认设备
参数二：超过录制长度后 是否重头录制
参数三：录制时长
参数四：采样率

```
if( Input.GetKeyDown(KeyCode.Space) )
{
    clip = Microphone.Start(null, false, 10, 44100);
}
```



##### 结束录制

```
if( Input.GetKeyUp(KeyCode.Space) )
{
    Microphone.End(null);
    //第一次去获取 没有才添加 
    AudioSource s = this.GetComponent<AudioSource>();
    if (s == null)
        s = this.gameObject.AddComponent<AudioSource>();
    s.clip = clip;
    s.Play();

}
```



##### 获取音频数据用于存储或者传输

规则 用于存储数组数据的长度 是用 声道数 * 剪辑长度

```
float[] f = new float[clip.channels * clip.samples];
clip.GetData(f, 0);
print(f.Length);
```



### 其他

#### 场景切换

```
if( Input.GetKeyDown(KeyCode.Space) )
{
    //切换到场景2
    //直接 写代码 切换场景 可能会报错
    //原因是没有把该场景加载到场景列表当中
    SceneManager.LoadScene("Test2");

//用它不会报错 只会有警告 一样可以切换场景 
//SceneManager
//Application.LoadLevel("Test2");

}
```



#### 退出游戏

```
if( Input.GetKeyDown(KeyCode.Escape) )
{
    //执行这句代码 就会退出游戏
    //但是 在编辑模式下没有作用
    //一定是发布游戏过后 才有用
    Application.Quit();
}
```



#### 鼠标

##### 隐藏鼠标

`Cursor.visible = true;`

##### 锁定鼠标

None 就是 不锁定

Locked 锁定 鼠标会被限制在 屏幕的中心点 不仅会被锁定 还会被隐藏 可以通过ESC键 摆脱编辑模式下的锁定

Confined 限制在窗口范围内

`Cursor.lockState = CursorLockMode.Confined;`

##### 设置鼠标图片

参数一：光标图片

参数二：偏移位置 相对图片左上角

参数三：平台支持的光标模式（硬件或软件）

`Cursor.SetCursor(tex, Vector2.zero, CursorMode.Auto);`

#### 随机数

##### Unity中的随机数

Unity当中的Random类 此Random(Unity)非彼Random（C#）

```
//使用随机数 int重载 规则是 左包含 右不包含
//0~99之间的数
int randomNum = Random.Range(0, 100);
print(randomNum);
//float重载 规则是 左右都包含
float randomNumF = Random.Range(1.1f, 99.9f);
```



##### C#中的随机数

```
System.Random r = new System.Random();
r.Next(0, 100);
```



#### 委托

##### C#的自带委托

```
System.Action ac = () =>
{
    print("123");
};

System.Action<int, float> ac2 = (i, f) =>
{

};

System.Func<int> fun1 = () =>
{
    return 1;
};

System.Func<int,string> fun2 = (i) =>
{
    return "123";
};
```



##### Unity的自带委托

```
UnityAction uac = () =>
{

};

UnityAction<string> uac1 = (s) =>
{
    
};
```

