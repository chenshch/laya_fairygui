# laya_fairygui
 基于fgui.window设计的一套UI框架
 
 1.fgui创建UI，创建一个类继承BaseWindow,指定pkg_name(包名)，win_name(窗口名) m_full(全屏) m_pop(打开时弹出动画)  m_remove_pkg(关闭时是否移除包资源)
 2.GameUI.ts里注册窗口
 3.openUI(name: string, args?: any[], new_scene?: boolean)
	new_scene为true时，会创建新的场景  增加了个淡出效果 进行场景切换
